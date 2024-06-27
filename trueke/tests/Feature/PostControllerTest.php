<?php

namespace Tests\Feature;

use App\Models\Piece;
use App\Models\Post;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Tests\TestCase;

class PostControllerTest extends TestCase {
	use WithFaker;

	public function test_index_returns_list_of_posts() {
		// Get the index page
		$user = User::all()->first();
		$response = $this->actingAs($user)->get(route('posts.index'));

		// Check that the response is successful
		$response->assertStatus(ResponseAlias::HTTP_OK);

		// Check that each post exists onto DB
		$posts = Post::all();
		$response->assertStatus(ResponseAlias::HTTP_OK)
			->assertJsonCount(DatabaseSeeder::$NUM_POSTS)
			->assertJson($posts->toArray());
	}

	public function test_show_returns_specific_post() {
		// Get the show page for the post
		$user = User::all()->first();
		$post = Post::all()->first();
		$response = $this->actingAs($user)->get(route('posts.show', $post->id));

		// Check that the response is successful
		$response->assertStatus(ResponseAlias::HTTP_OK);

		// Check that the post is returned
		$response->assertJson($post->toArray());
	}

	public function test_show_returns_error_if_post_not_found() {
		$postId = 999;
		$user = User::all()->first();
		$response = $this->actingAs($user)->get(route('posts.show', $postId));
		$response->assertStatus(ResponseAlias::HTTP_NOT_FOUND);
	}

	public function test_create_new_post() {
		$post = Post::factory()->makeOne();
		$user = User::all()->random()->first();
		$pieceNotPosted = Piece::factory()->makeOne();
		$pieceNotPosted->user()->associate($user);
		$pieceNotPosted->save();
		$user->pieces()->save($pieceNotPosted);

		$data = [
			'pieces' => [$pieceNotPosted->id],
			'title' => $post->title,
			'description' => $post->description,
			'isActive' => $post->isActive,
		];

		$response = $this->actingAs($user)->post(route('posts.create'), $data);

		// Check that the response is successful
		$response->assertStatus(ResponseAlias::HTTP_CREATED);

		// Check if the post was created
		$this->assertDatabaseHas('posts', $post->toArray());
	}

	public function test_update_post() {
		$post_to_update = Post::all()->first();
		$user = $post_to_update->user()->first();
		$piecesNotPosted = $user->pieces()->whereNotIn('id', $post_to_update->pieces()->pluck('id'))->get('id')->toArray();

		$data = [
			'description' => 'Updated Description',
			'pieces' => $piecesNotPosted,
		];

		$response = $this->actingAs($user)->patch(route('posts.edit', $post_to_update->id), $data);
		$response->assertStatus(ResponseAlias::HTTP_OK);

		$updated_post = Post::find($post_to_update->id)->first();
		$this->assertDatabaseHas('posts', $updated_post->toArray());
		$this->assertDatabaseMissing('posts', $post_to_update->toArray());
	}

	public function test_destroy_deletes_post() {
		$post_to_delete = Post::all()->first();
		$user = $post_to_delete->user()->first();
		$response = $this->actingAs($user)->delete(route('posts.destroy', $post_to_delete->id));
		$response->assertStatus(ResponseAlias::HTTP_NO_CONTENT);

		// Check if the post was deleted
		$this->assertDatabaseMissing('pieces', [
			'id' => $post_to_delete->id,
		]);
	}

	public function test_destroy_returns_error_if_post_not_found() {
		$postId = 999;
		$user = User::all()->random()->first();
		$response = $this->actingAs($user)->delete(route('posts.destroy', $postId));
		$response->assertStatus(ResponseAlias::HTTP_NOT_FOUND);
	}
}
