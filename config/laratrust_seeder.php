<?php
return [
    "roles" => [
        "roles" => ["read", "create", "update", "delete"],
        "admins" => ["read", "create", "update", "delete", "updateProfile"],
        "sliders" => ["read", "create", "update", "delete"],
        "features" => ["read", "create", "update", "delete"],
        "counters" => ["read", "update"],
        "services" => ["read", "create", "update", "delete"],
        "clients" => ["read", "create", "update", "delete"],
        "pages" => ["read", "create", "update"],
        "contacts" => ["read", "create", "update", "delete"],
        "settings" => ["read", "update"],
        "contact_us" => ["read", "delete", "reply"],
    ],
];
