<?php

namespace App\Enums;

enum GoogleCallbackOutcome: string
{
    case Authenticated = 'authenticated';
    case RegistrationRequired = 'registration_required';
    case Linked = 'linked';
}
