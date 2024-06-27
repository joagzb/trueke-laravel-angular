<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AuthenticatedSessionController extends Controller {
	/**
	 * Handle an incoming authentication request.
	 * @throws ValidationException
	 */
	public function login(LoginRequest $request): JsonResponse {
		$request->authenticate();

		$request->session()->regenerate();

		$user = Auth::user();
		$token = $user->createToken("API_TOKEN")->plainTextToken;

		return response()->json([
			'user' => $user,
			'token' => $token,
		], ResponseAlias::HTTP_OK);

		return response()->json(Auth::user(), ResponseAlias::HTTP_OK);
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): Response {
		Auth::guard('web')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return response()->noContent();
	}
}
