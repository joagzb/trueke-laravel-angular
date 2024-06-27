<?php

namespace App\Models;

use App\Enums\Room;
use Eloquent;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 *
 *
 * @property string $id
 * @property int $user_id
 * @property string|null $post_id
 * @property string $title
 * @property string $description
 * @property string|null $material
 * @property string|null $brand
 * @property string|null $price
 * @property string $imageURL
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OfferedPieces> $offeredPieces
 * @property-read int|null $offered_pieces_count
 * @property-read \App\Models\Post|null $post
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\PieceFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Piece newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Piece newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Piece query()
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereImageURL($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereMaterial($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Piece whereUserId($value)
 * @mixin Eloquent
 */
class Piece extends Model {
	use HasFactory;
	use HasUlids;

	// protected $table = 'pieces';
	// protected $primaryKey = 'id';
	public $incrementing = false;
	protected $keyType = 'string';

	protected $fillable = [
		'title',
		'description',
		'material',
		'brand',
		'price',
		'imageURL',
		'room',
	];

	protected $casts = [
		'created_at' => 'datetime:Y-m-d H:i:s',
		'updated_at' => 'datetime:Y-m-d H:i:s',
		'status' => Room::class,
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'user_id',
	];

	public function offeredPieces(): HasMany {
		return $this->hasMany(OfferedPieces::class);
	}

	public function post(): BelongsTo {
		return $this->belongsTo(Post::class);
	}

	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}
}
