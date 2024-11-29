export interface Whiteboard {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface HomePageData {
    page: number;
    limit: number;
    itemsCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: Whiteboard[];
}

const randomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleString();
};

export const mockHomePageData: HomePageData = {
    page: 2,
    limit: 10,
    itemsCount: 30,
    pageCount: 3,
    hasPreviousPage: true,
    hasNextPage: true,
    items: [
        {
            id: "6502d32f598e4d1bbfd8c1ab",
            name: "Marketing lecture",
            imageUrl:
                "https://cc-prod.scene7.com/is/image/CCProdAuthor/Whiteboard-animation_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1ac",
            name: "Math lecture",
            imageUrl:
                "https://www.shutterstock.com/image-vector/physics-seamless-pattern-equations-figures-600nw-1491573824.jpg",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1ad",
            name: "Chemistry lecture",
            imageUrl:
                "https://www.shutterstock.com/image-vector/chemical-formula-outlines-on-whiteboard-600nw-732477289.jpg",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1ae",
            name: "Physics section of electricity",
            imageUrl:
                "https://media.istockphoto.com/id/184612712/photo/hand-written-formulas-of-electrotechnics-and-electronics-on-white-background.jpg?s=612x612&w=0&k=20&c=A3H33FPntnSRH1d_BKt0VzpUI4xxK1oUj3fD6b5pOaA=",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1af",
            name: "Sketches",
            imageUrl:
                "https://img.freepik.com/premium-vector/hand-drawn-party-doodle-happy-birthday_111016-751.jpg",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1b0",
            name: "Doodles",
            imageUrl:
                "https://t4.ftcdn.net/jpg/05/29/02/29/360_F_529022939_6gUKA2DjlUcGOcOOdDHt8yX03e1tk495.jpg",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1b1",
            name: "Brainstorming",
            imageUrl:
                "https://t3.ftcdn.net/jpg/00/75/24/82/360_F_75248279_foJ1QnSNi8sJG5CBsTJZOcR2njDXF5hl.jpg",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1b2",
            name: "Business Planning",
            imageUrl:
                "https://media.istockphoto.com/id/1302231916/vector/business-doodles-hand-drawn-icons.jpg?s=612x612&w=0&k=20&c=LNfUAJ9j_3Qyh6wQD-ingjKaG7BXFGR_yVxQTKiwVjg=",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1b3",
            name: "Website planning",
            imageUrl:
                "https://www.shutterstock.com/image-vector/hand-drawn-vector-illustration-icons-600nw-741939433.jpg",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
        {
            id: "6502d32f598e4d1bbfd8c1b4",
            name: "Childish Art",
            imageUrl:
                "https://www.shutterstock.com/image-vector/doodle-space-illustration-childish-style-600nw-1989850220.jpg",
            createdAt: randomDate(new Date("2024-08-01"), new Date("2024-10-01")),
            updatedAt: randomDate(new Date("2024-10-01"), new Date("2024-10-20")),
        },
    ],
};