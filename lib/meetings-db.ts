import { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-11-02",
        meetingType: "general",
        presiding: "Bishop Carhuaz",
        conducting: "Brother Saul",
        announcements: ["New temple"],
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Brother Raul Ginemez",
        wardBusiness: [{description: "Sustaining of new Primary president"}],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: "Sister Page", topic: "", type: "musical-number" },
            { name: "Youth Ariel", topic: "", type: "musical-number" }
        ],
        closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
        closingPrayer: "Brother Manuel",
    },

    {
        id: 2,
        date: "2026-11-09",
        meetingType: "regular",
        presiding: "President Mendoza",
        conducting: "Brother Daniel",
        announcements: [
            "Youth activity this Saturday",
            "Temple recommend interviews"
        ],
        openingHymn: {
            number: 85,
            title: "How Firm a Foundation"
        },
        openingPrayer: "Sister Valeria",
        wardBusiness: [
            {
                description: "Sustaining of new Relief Society secretary"
            }
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 193,
            title: "I Stand All Amazed"
        },
        speakers: [
            {
                name: "Brother Samuel",
                topic: "Strengthening Our Faith",
                type: "speaker"
            },
            {
                name: "Sister Elena",
                topic: "Serving Others",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 227,
            title: "Improve the Shining Moments"
        },
        closingPrayer: "Brother Jorge"
    },

    {
        id: 3,
        date: "2026-09-20",
        meetingType: "stake",
        presiding: "President Ramirez",
        conducting: "Brother Carlos",
        announcements: [
            "Stake conference assignments"
        ],
        openingHymn: {
            number: 89,
            title: "The Lord Is My Light"
        },
        openingPrayer: "Brother Mateo",
        wardBusiness: [{description: "Special meeting for new converts"}, {description: "Gala for young single adults"}, {description: "Gala for married couples"}],
        stakeBusiness: true,
        sacramentHymn: {
            number: 194,
            title: "There Is a Green Hill Far Away"
        },
        speakers: [
            {
                name: "President Ramirez",
                topic: "Following the Savior",
                type: "speaker"
            },
            {
                name: "Sister Thompson",
                topic: "Faith in Jesus Christ",
                type: "speaker"
            },
            {
                name: "Youth Choir",
                topic: "",
                type: "musical-number"
            }
        ],
        closingHymn: {
            number: 219,
            title: "Because I Have Been Given Much"
        },
        closingPrayer: "Sister Mariana"
    },

    {
        id: 4,
        date: "2026-09-13",
        meetingType: "testimony",
        presiding: "Bishop Torres",
        conducting: "Brother Luis",
        announcements: [
            "Food donation drive"
        ],
        openingHymn: {
            number: 100,
            title: "Nearer, Dear Savior, to Thee"
        },
        openingPrayer: "Sister Camila",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 174,
            title: "While of These Emblems We Partake"
        },
        speakers: [
            {
                name: "Bishop Torres",
                topic: "The Importance of the Lord's Supper",
                type: "speaker"
            },
            {
                name: "Sister Andrea",
                topic: "Charity as a disciple of Jesus Christ",
                type: "speaker"
            },
            {
                name: "Brother Felipe",
                topic: "Easter Sunday",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 96,
            title: "Dearest Children, God Is Near You"
        },
        closingPrayer: "Brother Esteban"
    },

    {
        id: 5,
        date: "2026-09-14",
        meetingType: "regular",
        presiding: "Bishop Herrera",
        conducting: "Sister Patricia",
        announcements: [
            "Christmas service project",
            "Ward choir rehearsal"
        ],
        openingHymn: {
            number: 209,
            title: "Hark! The Herald Angels Sing"
        },
        openingPrayer: "Brother Nicolas",
        wardBusiness: [
            {
                description: "Calling of new Sunday School teacher"
            },
            {
                description: "Sustaining of Primary teachers"
            }
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 172,
            title: "In Humility, Our Savior"
        },
        speakers: [
            {
                name: "Sister Patricia",
                topic: "The Importance of Family",
                type: "speaker"
            },
            {
                name: "Brother Oscar",
                topic: "Preparing for Christmas",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 201,
            title: "Joy to the World"
        },
        closingPrayer: "Sister Gabriela"
    },

    {
        id: 6,
        date: "2026-09-07",
        meetingType: "general",
        presiding: "Bishop Castillo",
        conducting: "Brother Andres",
        announcements: [
            "Christmas devotional next Sunday"
        ],
        openingHymn: {
            number: 201,
            title: "Joy to the World"
        },
        openingPrayer: "Brother Ricardo",
        wardBusiness: [
            {
                description: "Sustaining of new Elders Quorum presidency"
            }
        ],
        stakeBusiness: true,
        sacramentHymn: {
            number: 169,
            title: "In Remembrance of Thy Suffering"
        },
        speakers: [
            {
                name: "Sister Sofia",
                topic: "The Light of Christ",
                type: "speaker"
            },
            {
                name: "Ward Choir",
                topic: "",
                type: "musical-number"
            },
            {
                name: "Brother Andres",
                topic: "Remembering the Savior",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 214,
            title: "I Know That My Redeemer Lives"
        },
        closingPrayer: "Brother Gabriel"
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings?.filter(m => m.date === date);
    return meetings
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null
}