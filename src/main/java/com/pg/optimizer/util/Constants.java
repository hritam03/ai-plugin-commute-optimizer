package com.pg.optimizer.util;

import com.pg.optimizer.entity.AreaMetadata;

import java.util.Map;

public class Constants {
    public static final Map<String, AreaMetadata> OFFICE_LOCATIONS =
            Map.of(

                    "Ecospace",
                    new AreaMetadata(
                            null,
                            "Ecospace",
                            12.9279,
                            77.6808,
                            0,
                            0
                    ),

                    "Manyata Tech Park",
                    new AreaMetadata(
                            null,
                            "Manyata Tech Park",
                            13.0480,
                            77.6200,
                            0,
                            0
                    ),

                    "Bagmane Tech Park",
                    new AreaMetadata(
                            null,
                            "Bagmane Tech Park",
                            12.9784,
                            77.6634,
                            0,
                            0
                    )
            );
}
