<?php

namespace App\Enums;

enum TruekeStatus: string
{
    case IN_PROGRESS = 'in progress';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
    case EXPIRED = 'expired';
}
