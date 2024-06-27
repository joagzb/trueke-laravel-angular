<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase {
	use RefreshDatabase;

	public function test_users_can_authenticate_with_valid_credentials(): void {
		$user = User::factory()->create();

		$response = $this->post('api/login', [
			'email' => $user->email,
			'password' => 'password',
		]);

		$this->assertAuthenticated();
		$response->assertSuccessful();
		$response->assertJson($user->toArray());
	}

	public function test_users_can_not_authenticate_with_invalid_password(): void {
		$user = User::factory()->create();

		$this->post('api/login', [
			'email' => $user->email,
			'password' => 'wrong-password',
		]);

		$this->assertGuest();
	}

	public function test_users_can_logout(): void {
		$user = User::factory()->create();

		$response = $this->actingAs($user)->post('api/logout');

		$this->assertGuest();
		$response->assertNoContent();
	}
}
