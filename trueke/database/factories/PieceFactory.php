<?php
namespace Database\Factories;
use App\Enums\Room;
use App\Models\Piece;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Piece>
 */
class PieceFactory extends Factory {
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array {
		return [
			'title' => fake()->randomElement(['bed', 'table', 'chair', 'cupboard', 'couch', 'shrank']),
			'description' => fake()->sentence(),
			'material' => fake()->randomElement(['wood', 'metal', 'plastic']),
			'brand' => fake()->word(),
			'price' => fake()->randomFloat(2, 0, 100),
			'room' => fake()->randomElement(Room::cases()),
			'imageURL' => fake()->imageUrl(),
		];
	}
}
