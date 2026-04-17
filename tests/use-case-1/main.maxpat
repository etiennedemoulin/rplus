{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 1,
            "revision": 3,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 102.0, 273.0, 1000.0, 696.0 ],
        "boxes": [
            {
                "box": {
                    "id": "obj-4",
                    "linecount": 3,
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 702.0, 55.0, 127.0, 49.0 ],
                    "presentation_linecount": 3,
                    "text": ";\rgroup1-my-param 0;\rgroup2-my-param 100"
                }
            },
            {
                "box": {
                    "id": "obj-3",
                    "linecount": 3,
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 510.0, 55.0, 127.0, 49.0 ],
                    "text": ";\r[1-50]-my-param 12;\r[51-100]-my-param 40"
                }
            },
            {
                "box": {
                    "id": "obj-1",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 194.0, 54.0, 106.0, 22.0 ],
                    "text": "mc.poly~ poly 100"
                }
            }
        ],
        "lines": [],
        "autosave": 0
    }
}