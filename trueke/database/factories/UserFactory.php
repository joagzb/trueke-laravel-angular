<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{

    private string $pictureURL = 'https://randomuser.me/api/';

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'surname' => fake()->lastName(),
            'country' => 'Argentina',
            'state' => fake()->randomElement(['Formosa','Chaco','Corrientes','Jujuy','Salta']),
            'city' => fake()->randomElement(['city1','city2','city3','city4','city5']),
            'suburb' => fake()->randomElement(['suburb1','suburb2','suburb3','suburb4','suburb5']),
            'phone' => fake()->phoneNumber(),
            'image' => $this->getRandomoUserPicture(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    private function getRandomoUserPicture()
    {
        $response = Http::get($this->pictureURL);
        $data = $response->json();
        return $data['results'][0]['picture']['medium'];
    }

}
