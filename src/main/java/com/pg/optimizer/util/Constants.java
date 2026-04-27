package com.pg.optimizer.util;

import com.pg.optimizer.entity.AreaMetadata;

import java.util.Map;

public class Constants {

    public static final Map<String, AreaMetadata> AREA_METADATA =
            Map.of(

                    "Bellandur",
                    new AreaMetadata(
                            "Bellandur",
                            12.9250,
                            77.6760,
                            7,
                            7
                    ),

                    "Sarjapur Road",
                    new AreaMetadata(
                            "Sarjapur Road",
                            12.9000,
                            77.7000,
                            6,
                            6
                    ),

                    "Koramangala",
                    new AreaMetadata(
                            "Koramangala",
                            12.9352,
                            77.6245,
                            9,
                            9
                    ),

                    "BTM Layout",
                    new AreaMetadata(
                            "BTM Layout",
                            12.9166,
                            77.6101,
                            7,
                            8
                    ),

                    "Whitefield",
                    new AreaMetadata(
                            "Whitefield",
                            12.9698,
                            77.7499,
                            8,
                            7
                    ),

                    "HSR Layout",
                    new AreaMetadata(
                            "HSR Layout",
                            12.9116,
                            77.6474,
                            6,
                            8
                    ),

                    "Electronic City",
                    new AreaMetadata(
                            "Electronic City",
                            12.8456,
                            77.6603,
                            5,
                            5
                    )
            );

    public static final Map<String, AreaMetadata> OFFICE_LOCATIONS =
            Map.of(

                    "Ecospace",
                    new AreaMetadata(
                            "Ecospace",
                            12.9279,
                            77.6808,
                            0,
                            0
                    ),

                    "Manyata Tech Park",
                    new AreaMetadata(
                            "Manyata Tech Park",
                            13.0480,
                            77.6200,
                            0,
                            0
                    ),

                    "Bagmane Tech Park",
                    new AreaMetadata(
                            "Bagmane Tech Park",
                            12.9784,
                            77.6634,
                            0,
                            0
                    )
            );
}
