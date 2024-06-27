<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class RegisteredUserController extends Controller {
	public function show($id): JsonResponse {
		$user = User::findOrFail($id);
		return response()->json($user);
	}

	/**
	 * Handle an incoming registration request.
	 *
	 * @throws ValidationException
	 */
	public function create(Request $request): JsonResponse {
		$request->validate([
			'name' => ['required', 'string', 'max:255'],
			'surname' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
			'password' => ['required', 'confirmed', 'min:4'],
		]);

		$user = User::create([
			'name' => $request->name,
			'surname' => $request->surname,
			'email' => $request->email,
			'password' => Hash::make($request->password),
		]);

		return response()->json($user, ResponseAlias::HTTP_CREATED);
	}

	public function update(Request $request, $id): JsonResponse {
		$request->validate([
			'name' => ['required', 'string', 'min:4', 'max:255'],
			'surname' => ['required', 'string', 'min:4', 'max:255'],
			'phone' => ['nullable', 'string', 'min:8', 'max:14'],
			'country' => ['required', 'string', 'min:5', 'max:255'],
			'city' => ['nullable', 'string', 'min:5', 'max:255'],
			'state' => ['nullable', 'string', 'min:5', 'max:255'],
			'suburb' => ['nullable', 'string', 'min:3', 'max:255'],
			'image' => ['nullable', 'string', 'max:255'],
			'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,' . Auth::user()->id],
			'password' => ['string', 'min:4'],
		]);

		$user = User::findOrFail($id);

		$user->update($request->all());

		return response()->json($user, ResponseAlias::HTTP_OK);
	}
}
