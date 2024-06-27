<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\OfferedPieces;
use App\Models\Piece;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class OfferController extends Controller {

	public function index(Request $request): JsonResponse {
		if (!$request->input('posts') && !$request->input('user_id')) {
			return response()->json(['message' => 'no enough params set for this request'], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
		}

		$offers = Offer::query()->with(['user', 'post', 'post.pieces', 'post.user']);

		// filter by user_id when fetching all offers a user made
		if ($request->input('user_id')) {
			$offers->where('user_id', $request->input('user_id'));
		}

		// filter by post_id when fetching all offers a post has received
		if ($request->input('posts')) {
			$offers->whereIn('post_id', json_decode($request->input('posts')));
		}

		$offers = $offers->get();

		// append offered pieces
		foreach ($offers as $offer) {
			$piecesOfferedIdCollection = OfferedPieces::query()->with(['piece'])->where('offer_id', $offer->id)->get()->pluck('piece');
			$offer->pieces = $piecesOfferedIdCollection;
		}

		return response()->json($offers->toArray(), ResponseAlias::HTTP_OK);
	}

	public function show($id) {
		// Return the offer by its id as a JSON response
		$offer = Offer::findOrFail($id)->load(['user', 'post', 'post.pieces', 'post.user']);

		// append offered pieces
		$piecesOfferedIdCollection = OfferedPieces::query()->with(['piece'])->where('offer_id', $id)->get()->pluck('piece');
		$offer->pieces = $piecesOfferedIdCollection;

		return response()->json($offer, ResponseAlias::HTTP_OK);
	}

	public function create(Request $request): JsonResponse {
		// Validate the request data
		$request->validate([
			'post_id' => ['required', 'exists:posts,id'],
			'pieces' => ['required', 'array'],
			'pieces.*' => ['required', 'exists:pieces,id'],
			'message' => ['required', 'string', 'max:255'],
			'isSelected' => ['boolean'],
			'isLiked' => ['boolean'],
		]);

		$post = Post::findOrFail($request->post_id);
		$user = Auth::user();

		// validate if user cannot make any offer to its own post
		if ($post->user_id == $user->id) {
			return response()->json(['message' => 'You cannot make an offer to your own post'], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
		}

		// validate if the user has already made an offer to this post
		if ($post->offers()->where('offers.user_id', $user->id)->exists()) {
			return response()->json(['message' => 'You have already made an offer to this post. Try editing the offer'], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
		}

		// validate pieces offered belong to user
		if (!$user->pieces()->whereIn('id', $request->pieces)->exists()) {
			return response()->json(['message' => 'You do not have that piece of forniture'], ResponseAlias::HTTP_METHOD_NOT_ALLOWED);
		}

		// Create a new offer using the validated data
		$offer = new Offer($request->except('pieces', 'pieces.*'));

		$offer->user()->associate($user);
		$offer->post()->associate($post);
		$offer->save();
		$user->offers()->save($offer);
		$post->offers()->save($offer);

		// create a new entry to OfferedPieces
		foreach ($request->pieces as $piece_id) {
			$offeredPiece = new OfferedPieces();
			$offeredPiece->offer()->associate($offer);
			$offeredPiece->piece()->associate(Piece::find($piece_id));
			$offeredPiece->save();
		}

		// Return the created offer as a JSON response
		return response()->json($offer, ResponseAlias::HTTP_CREATED);
	}

	//TODO: if offer is selected, then a Trueke must be created
	public function edit(Request $request, $id): JsonResponse {
		// Validate the request data
		$request->validate([
			'pieces' => ['array'],
			'pieces.*' => ['exists:pieces,id'],
			'message' => ['string', 'max:255'],
			'isSelected' => ['boolean'],
			'isLiked' => ['boolean'],
		]);

		$user = Auth::user();
		$offer = Offer::findOrFail($id);

		// validate pieces offered belong to user
		if ($request->pieces && !$user->pieces()->whereIn('pieces.id', $request->pieces)->exists()) {
			return response()->json(['message' => 'You do not have that piece of forniture'], ResponseAlias::HTTP_METHOD_NOT_ALLOWED);
		}

		// Update the offer with the validated data
		$offer->update($request->except('pieces', 'pieces.*', 'user_id'));

		// update offered pieces
		if ($request->pieces) {
			$offer->offeredPieces()->delete();
			foreach ($request->pieces as $piece_id) {
				$offeredPiece = new OfferedPieces();
				$offeredPiece->offer()->associate($offer);
				$offeredPiece->piece()->associate(Piece::find($piece_id));
				$offeredPiece->save();
			}
		}

		// Return the updated offer as a JSON response
		$offer->refresh();
		return response()->json($offer, ResponseAlias::HTTP_OK);
	}

	public function destroy($id): JsonResponse {
		// find the offer
		$offer = Offer::findOrFail($id);
		$offer->delete();

		// Return ok if deleted
		return response()->json(null, ResponseAlias::HTTP_NO_CONTENT);
	}
}
