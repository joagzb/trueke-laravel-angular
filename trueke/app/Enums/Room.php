<?php

namespace App\Enums;

enum Room: string
{
    case LIVING_ROOM = 'living room';
    case KITCHEN = 'kitchen';
    case BEDROOM = 'bedroom';
    case GARAGE = 'garage';
    case CORRIDOR = 'corridor';
    case COWORKING_SPACE = 'coworking space';
    case BBQ = 'bbq';
    case LAUNDRY = 'laundry';
    case GARDEN = 'garden';
}
