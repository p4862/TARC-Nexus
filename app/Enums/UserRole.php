<?php

namespace App\Enums;

enum UserRole: string
{
    case Administrator = 'Administrator';
    case Exhibitor = 'Exhibitor';
    case Guest = 'Guest';

    /**
     * @return list<self>
     */
    public static function publiclyRegistrable(): array
    {
        return [
            self::Exhibitor,
            self::Guest,
        ];
    }

    /**
     * @return list<string>
     */
    public static function publiclyRegistrableValues(): array
    {
        return array_column(self::publiclyRegistrable(), 'value');
    }
}
