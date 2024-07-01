<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Offer;
use App\Models\Piece;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {

	static $NUM_USERS = 10;
	static $NUM_PIECES_PER_USER = 3;
	static $NUM_POSTS = 3;
	static $NUM_OFFERS = 3;

	/**
	 * Seed the application's database.
	 */
	public function run(): void {
		if (env('APP_ENV') != 'production' && env('APP_ENV') != 'demo') {
			// generate random users, each owning 3 pieces of forniture
			$users = User::factory($this::$NUM_USERS)
				->has(Piece::factory()->count($this::$NUM_PIECES_PER_USER))
				->create();

			//generate posts for 3 user
			$users->random($this::$NUM_POSTS)->each(function ($user) {
				$post = Post::factory()->makeOne();
				$user->posts()->save($post);

				//add users forniture to post
				$post->pieces()->save($user->pieces->first());
			});

			//generate offers
			$users->random($this::$NUM_OFFERS)->each(function ($userOffering) {
				$offer = Offer::factory()->makeOne();

				$another_user = User::has('posts')->where('id', '!=', $userOffering->id)->inRandomOrder()->first();
				$another_user_post = $another_user->posts()->first();
				$offer->user()->associate($userOffering);
				$offer->post()->associate($another_user_post);
				$another_user_post->offers()->save($offer);
				$offer->save();
			});

			if (env('APP_ENV') != 'test') {
				// DUMMY USERS
				$this->insertDummyUsers();
			}
		}

	}

	private function insertDummyUsers() {
		// Create dummy users
		$dummyUser1 = User::create([
			'name' => 'Dummy',
			'surname' => 'User1',
			'email' => 'user1@test.com',
			'password' => Hash::make('test1'),
			'country' => 'Argentina',
			'state' => 'Corrientes',
		]);

		$dummyUser2 = User::create([
			'name' => 'Dummy',
			'surname' => 'User2',
			'email' => 'user2@test.com',
			'password' => Hash::make('test2'),
			'country' => 'Argentina',
			'state' => 'Corrientes',
		]);

		// Assign pieces of furniture to dummy users
		$dummyUser1Pieces = Piece::factory()->count(7)->create(['user_id' => $dummyUser1->id]);
		$dummyUser2Pieces = Piece::factory()->count(5)->create(['user_id' => $dummyUser2->id]);
	}
}
