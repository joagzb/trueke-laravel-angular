<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('pieces', function (Blueprint $table) {
			$table->ulid('id')->primary();
			$table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
			$table->foreignIdFor(Post::class)->nullable()->constrained()->nullOnDelete();
			$table->string('title');
			$table->string('description');
			$table->string('material')->nullable();
			$table->string('brand')->nullable();
			$table->string('price')->nullable();
			$table->string('room')->nullable();
			$table->string('imageURL');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists('pieces');
	}
};
