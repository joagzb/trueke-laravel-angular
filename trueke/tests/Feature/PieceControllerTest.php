<?php

namespace Tests\Feature;

use App\Models\Piece;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Tests\TestCase;

class PieceControllerTest extends TestCase {
	use WithFaker;

	public function testIndex_returns_array_of_pieces() {
		// Call the index action
		$response = $this->get(route('pieces.index'));

		// Assert the expected response
		$pieces = Piece::all();
		$response->assertStatus(ResponseAlias::HTTP_OK)
			->assertJsonCount(DatabaseSeeder::$NUM_PIECES_PER_USER * DatabaseSeeder::$NUM_USERS)
			->assertJson($pieces->toArray());
	}

	public function testShow_returns_piece_by_id() {
		// get an user and its pieces
		$user = User::all()->first();
		$piece = $user->pieces->first();

		// Call the show action
		$response = $this->actingAs($user)->get(route('pieces.show', $piece->id));

		// Assert the expected response
		$response->assertStatus(ResponseAlias::HTTP_OK)
			->assertJson($piece->toArray());
	}

	public function testShow_cant_find_piece_by_id() {
		// Define a non-existent ID
		$nonExistentId = 999;

		// Call the show action with the non-existent ID
		$user = User::all()->first();
		$response = $this->actingAs($user)->get(route('pieces.show', $nonExistentId));

		// Assert the expected response
		$response->assertStatus(ResponseAlias::HTTP_NOT_FOUND);
	}

	public function test_creates_piece() {
		// get user
		$user = User::all()->first();

		// payload to test
		$piece = Piece::factory()->makeOne();
		$data = [
			'title' => $piece->title,
			'description' => $piece->description,
			'imageURL' => $piece->imageURL,
		];

		// Call the create action
		$response = $this->actingAs($user)->post(route('pieces.create'), $data);

		// Assert the expected response
		$response->assertStatus(ResponseAlias::HTTP_CREATED);

		// Check if the piece was created
		$this->assertDatabaseHas('pieces', $data);
	}

	public function test_does_not_create_piece_on_validation_failure() {
		// Define the data for the create request
		$data = [
			'title' => '',
			'description' => '',
		];

		// Call the create action
		$user = User::all()->first();
		$response = $this->actingAs($user)->post(route('pieces.create'), $data);

		// Assert the expected response
		$response->assertSessionHasErrors(['title', 'description', 'imageURL']);

		// Check if the piece was not created
		$this->assertDatabaseMissing('pieces', $data);
	}

	public function test_updates_piece() {
		// Define the data for the update request
		$user = User::all()->first();
		$piece = $user->pieces->first();
		$data = [
			'title' => 'Updated Piece',
			'description' => 'This is an updated piece',
		];

		// Call the update action
		$response = $this->actingAs($user)->patch(route('pieces.edit', $piece->id), $data);

		// Assert the expected response
		$response->assertSuccessful();

		// Check if the piece was updated
		$this->assertDatabaseHas('pieces', $data);
	}

	public function testUpdate_does_not_update_piece_on_validation_failure() {
		// get an existing piece to update
		$user = User::all()->first();
		$piece = $user->pieces->first();

		// Define the data for the update request
		$data = [
			'title' => '',
			'description' => '',
		];

		// Call the update action
		$response = $this->actingAs($user)->patch(route('pieces.edit', $piece->id), $data);

		// Assert the expected response
		$response->assertSessionHasErrors(['title', 'description']);

		// Check if the piece was not updated
		$this->assertDatabaseHas('pieces', [
			'id' => $piece->id,
			'title' => $piece->title,
			'description' => $piece->description,
		]);
	}

	public function testDestroy_piece() {
		// get an existing piece to delete
		$user = User::all()->first();
		$piece = $user->pieces->first();

		// Call the destroy action
		$response = $this->actingAs($user)->delete(route('pieces.destroy', $piece->id));

		// Assert the expected response
		$response->assertSuccessful();

		// Check if the piece was deleted
		$this->assertDatabaseMissing('pieces', [
			'id' => $piece->id,
		]);
	}
}
