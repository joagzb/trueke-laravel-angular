<?php

namespace App\Http\Controllers;

use App\Enums\Room;
use App\Models\Piece;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class PieceController extends Controller {
	// Display a listing of the resource
	public function index(Request $request): JsonResponse {
		$pieces = Piece::query()->with('user');

		if ($request->input('user_id')) {
			$pieces->whereUserId($request->input('user_id'));
		}

		if ($request->input('room')) {
			$pieces->where('room', $request->input('room'));
		}

		$pieces = $pieces->get();

		return response()->json($pieces->toArray(), ResponseAlias::HTTP_OK);
	}

	// Display the specified resource
	public function show($id): JsonResponse {
		$piece = Piece::findOrFail($id)->load('user');
		return response()->json($piece, ResponseAlias::HTTP_OK);
	}

	// Show the form for creating a new resource
	public function create(Request $request): JsonResponse {
		$request->validate([
			'title' => ['required', 'string', 'min:3', 'max:255'],
			'description' => ['required', 'string', 'min:6', 'max:255'],
			'imageURL' => ['required', 'string', 'min:10', 'max:255'],
			'price' => ['nullable', 'numeric', 'min:0', 'max:1000000'],
			'material' => ['nullable', 'string', 'min:3', 'max:255'],
			'brand' => ['nullable', 'string', 'min:3', 'max:255'],
			'room' => ['nullable', 'string', 'in:' . implode(',', array_column(Room::cases(), 'value'))],
		]);

		$user = Auth::user();
		$piece = $user->pieces()->create($request->all());

		return response()->json($piece, ResponseAlias::HTTP_CREATED);
	}

	// Show the form for editing the specified resource
	public function edit(Request $request, $id): JsonResponse {
		$request->validate([
			'title' => ['string', 'min:3', 'max:255'],
			'description' => ['string', 'min:6', 'max:255'],
			'imageURL' => ['string', 'min:10', 'max:255'],
			'price' => ['nullable', 'numeric', 'nullable', 'min:0', 'max:1000000'],
			'material' => ['nullable', 'string', 'nullable', 'min:3', 'max:255'],
			'brand' => ['nullable', 'string', 'nullable', 'min:3', 'max:255'],
			'room' => ['nullable', 'string', 'in:' . implode(',', array_column(Room::cases(), 'value'))],

		]);

		$user = Auth::user();
		$piece = Piece::findOrFail($id);

		// validate that user owns the piece
		if (!$user->pieces()->where('id', $piece->id)->exists()) {
			return response()->json('cannot update this piece', ResponseAlias::HTTP_METHOD_NOT_ALLOWED);
		}

		$piece->update($request->all());

		return response()->json($piece, ResponseAlias::HTTP_OK);
	}

	// TODO: if a piece is listed of offered, the post and offer where it appears should be deleted before deleting the piece
	// Remove the specified resource from storage
	public function destroy($id): JsonResponse {
		$piece = Piece::findOrFail($id);
		$piece->delete();

		return response()->json(null, ResponseAlias::HTTP_NO_CONTENT);
	}

}
