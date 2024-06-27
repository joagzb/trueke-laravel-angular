<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Trueke;
use App\Models\User;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class TruekeController extends Controller {

	public function index(): JsonResponse {
		$truekes = Trueke::all()->load('offer')->where('offer.user_id', Auth::user()->id);
		return response()->json($truekes, ResponseAlias::HTTP_OK);
	}

	public function show($id): JsonResponse {
		$trueke = Trueke::findOrFail($id)->load('offer')->where('offer.user_id', Auth::user()->id);
		return response()->json($trueke, ResponseAlias::HTTP_OK);
	}

	public function create(Request $request): JsonResponse {
		$request->validate([
			'offer_id' => ['required', 'exists:offers,id'],
			'status' => ['required', 'in:TruekeStatus'],
			'expireDate' => ['required', 'date', 'after:now'],
			'isActive' => ['boolean'],
		]);

		$user = Auth::user();
		$offer = Offer::findOrFail($request->offer_id);

		// validate that user post owner is who approved the offer
		if (!$user->posts()->where('id', $offer->post()->id)->exists() || $offer->user_id == $user->id) {
			return response()->json('cannot authorize this trueke', ResponseAlias::HTTP_METHOD_NOT_ALLOWED);
		}

		$trueke = Trueke::create($request->all());

		return response()->json($trueke, ResponseAlias::HTTP_CREATED);
	}

	public function edit(Request $request, $id): JsonResponse {
		$request->validate([
			'offer_id' => ['required', 'exists:offers,id'],
			'status' => ['in:TruekeStatus'],
			'expireDate' => ['date', 'after:now'],
			'isActive' => ['boolean'],
		]);

		$trueke = Trueke::findOrFail($id);
		$user = Auth::user();
		$offer = Offer::findOrFail($request->offer_id);

		// validate that user post owner is who approved the offer
		if (!$user->posts()->where('id', $offer->post()->id)->exists() || $offer->user_id == $user->id) {
			return response()->json('cannot update this trueke', ResponseAlias::HTTP_METHOD_NOT_ALLOWED);
		}

		$trueke->update($request->all());

		return response()->json($trueke, ResponseAlias::HTTP_OK);
	}

	public function destroy($id): JsonResponse {
		$trueke = Trueke::findOrFail($id);
		$trueke->delete();

		return response()->json(null, ResponseAlias::HTTP_NO_CONTENT);
	}
}
