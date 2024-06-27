<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property string $ulid
 * @property string $offer_id
 * @property string $piece_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Offer $offer
 * @property-read \App\Models\Piece $piece
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces query()
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces whereOfferId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces wherePieceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces whereUlid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfferedPieces whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OfferedPieces extends Model
{
    use HasFactory;
    use HasUlids;

    protected $table = 'offered_pieces';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];


    public function piece(): BelongsTo
    {
        return $this->belongsTo(Piece::class);
    }

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }
}
