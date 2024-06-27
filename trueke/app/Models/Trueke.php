<?php

namespace App\Models;

use App\Enums\TruekeStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;


/**
 * 
 *
 * @property string $id
 * @property TruekeStatus $status
 * @property \Illuminate\Support\Carbon $expireDate
 * @property string $isActive
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Offer|null $offer
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke query()
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke whereExpireDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trueke whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Trueke extends Model
{
    use HasFactory;
    use HasUlids;

    // protected $table = 'truekes';
    // protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'status', // in progress, completed, cancelled, expired
        'expireDate',
        'isActive',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'expireDate' => 'datetime:Y-m-d H:i:s',
        'status' => TruekeStatus::class,
    ];

    public function offer(): HasOne
    {
        return $this->hasOne(Offer::class);
    }
}
