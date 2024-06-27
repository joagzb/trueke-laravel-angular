<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\Post;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Tests\TestCase;

class OfferControllerTest extends TestCase {
	/**
	 * A basic feature test example.
	 */
	use RefreshDatabase, WithFaker;

	public function testIndex() {
		# the offers shown must be only queried by an user who the post belongs to

		$user = User::all()->first();
		$offers = Offer::all();
		$response = $this->actingAs($user)->get(route('offers.index'));

		$response->assertStatus(ResponseAlias::HTTP_OK)
			->assertJsonCount(DatabaseSeeder::$NUM_OFFERS)
			->assertJson($offers->toArray());
	}

	public function testShow() {
		$offer = Offer::all()->first();
		$user = $offer->user()->first();

		$response = $this->actingAs($user)->get(route('offers.show', $offer->id));

		$response->assertStatus(ResponseAlias::HTTP_OK);
		$response->assertJson($offer->toArray());
	}

	public function testShow_returns_error_if_offer_not_found() {
		$offerId = 999;
		$user = User::all()->first();
		$response = $this->actingAs($user)->get(route('offers.show', $offerId));
		$response->assertStatus(ResponseAlias::HTTP_NOT_FOUND);
	}

	public function testCreate() {
		$offer = Offer::factory()->makeOne();
		$user = User::all()->first();

		// get another user with posts
		$another_user = Post::where('posts.user_id', '!=', $user->id)->first()->user()->first();

		$data = [
			'post_id' => $another_user->posts()->first()->id,
			'pieces' => $user->pieces()->take(2)->pluck('id')->toArray(),
			'message' => $offer->message,
		];

		$response = $this->actingAs($user)->post(route('offers.create'), $data);

		$response->assertStatus(ResponseAlias::HTTP_CREATED);
		$this->assertDatabaseHas('offers', $offer->toArray());
	}

	public function testUpdate() {
		$offer_to_update = Offer::all()->first();
		$user = $offer_to_update->user()->first();

		$data = [
			'message' => 'updated message',
			'isLiked' => true,
		];

		$response = $this->actingAs($user)->patch(route('offers.edit', $offer_to_update->id), $data);

		$response->assertStatus(ResponseAlias::HTTP_OK);

		$updated_offer = Offer::find($offer_to_update->id)->first();
		$this->assertDatabaseHas('offers', $updated_offer->toArray());
		$this->assertDatabaseMissing('offers', $offer_to_update->toArray());

	}

	public function testDestroy() {
		$offer = Offer::all()->first();
		$user = $offer->user()->first();

		$response = $this->actingAs($user)->delete(route('offers.destroy', $offer->id));

		$response->assertStatus(ResponseAlias::HTTP_NO_CONTENT);
		$this->assertDatabaseMissing('offers', $offer->toArray());
	}

}
