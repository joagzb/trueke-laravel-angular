<?php

namespace App\Http\Controllers;

use App\Models\Piece;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class PostController extends Controller {

	// Display a listing of the resource
	public function index(Request $request): JsonResponse {
		$posts = Post::query()->with(['user', 'pieces', 'offers', 'offers.user']);

		if ($request->input('user_id')) {
			$posts = $posts->where('user_id', $request->input('user_id'));
		}

		if ($request->input('location')) {
			$posts = $posts->where('user.country', $request->input('location'));
		}

		if ($request->input('room')) {
			$posts = $posts->whereHas('pieces', function ($query) use ($request) {
				$query->where('room', $request->input('room'));
			});
		}

		if (Auth::check()) {
			$posts = $posts->where('user_id', '!=', Auth::user()->id);
		}

		if ($request->input('sortBy')) {
			$sortBy = $request->input('sortBy');

			if ($sortBy === 'title') {
				$posts = $posts->orderBy('title');
			} elseif ($sortBy === 'date') {
				$posts = $posts->orderBy('created_at', 'desc');
			}
		}

		$posts = $posts->get();

		return response()->json($posts->toArray(), ResponseAlias::HTTP_OK);
	}

	public function show($id): JsonResponse {
		$post = Post::findOrFail($id)->load(['user', 'pieces', 'offers', 'offers.user']);
		return response()->json($post, ResponseAlias::HTTP_OK);
	}

	public function create(Request $request) {
		$request->validate([
			'pieces' => ['required', 'array'],
			'pieces.*' => ['required', 'distinct', 'exists:pieces,id'],
			'title' => ['required', 'string', 'min:5', 'max:255'],
			'description' => ['string', 'min:5', 'max:255'],
			'isActive' => ['nullable', 'boolean'],
		]);

		$user = Auth::user();
		$piecesToPublish = Piece::whereIn('id', $request->pieces)->get();

		// validate pieces belong to user
		if (!$user->pieces()->whereIn('pieces.id', $request->pieces)->exists()) {
			return response()->json(['message' => 'You do not have that piece of forniture'], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
		}

		$post = new Post($request->except('pieces'));
		$post->user()->associate($user);
		$post->save();

		$piecesToPublish->each(function ($piece) use ($user, $post) {
			$piece->post()->associate($post);
			$piece->user()->associate($user);
			$piece->save();
		});

		$post->pieces()->saveMany($piecesToPublish);
		$user->posts()->save($post);

		// return post
		return response()->json($post, ResponseAlias::HTTP_CREATED);
	}

	public function edit($id, Request $request): JsonResponse {
		$request->validate([
			'pieces' => ['array'],
			'pieces.*' => ['distinct', 'exists:pieces,id'],
			'title' => ['string', 'max:255'],
			'description' => ['string', 'max:255'],
			'isActive' => ['boolean'],
		]);

		$post = Post::findOrFail($id);
		$user = Auth::user();
		$piecesToPublish = Piece::whereIn('id', $request->pieces)->get();

		// validate pieces belong to user
		if (!$user->pieces()->whereIn('pieces.id', $request->pieces)->exists()) {
			return response()->json(['message' => 'You do not have that piece of forniture'], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
		}

		$post->update($request->except('pieces', 'pieces.*'));

		if ($request->pieces) {
			$piecesToPublish->each(function ($piece) use ($post) {
				$piece->post()->dissociate();
				$piece->post()->associate($post);
				$piece->save();
			});
		}

		$post->refresh();
		return response()->json($post, ResponseAlias::HTTP_OK);
	}

	// TODO: if a post is deleted, then all related offers must be deleted
	public function destroy($id): JsonResponse {
		Post::findOrFail($id)->delete();
		return response()->json(null, ResponseAlias::HTTP_NO_CONTENT);
	}
}
