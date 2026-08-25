<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class AllowedExternalHost implements ValidationRule
{
    /**
     * @param  list<string>  $hosts
     */
    public function __construct(
        private readonly array $hosts,
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            return;
        }

        $host = mb_strtolower((string) parse_url($value, PHP_URL_HOST));

        if (! in_array($host, $this->hosts, true)) {
            $fail('The :attribute must use an approved service.');
        }
    }
}
