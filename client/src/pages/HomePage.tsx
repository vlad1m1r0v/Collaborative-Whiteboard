import React from "react";
import Header from '@/components/Header';
import HomeBar from "@/components/HomeBar";
import WhiteboardCard from "@/components/WhiteboardCard";
import PaginationBlock from "@/components/PaginationBlock";
import {mockHomePageData} from "@/mocks/homePageData";


const HomePage: React.FC = () => {
    const {
        page,
        pageCount,
        hasPreviousPage,
        hasNextPage,
        limit,
        itemsCount
    } = mockHomePageData;

    return (
        <>
            <Header/>
            <HomeBar/>
            <div className="mx-auto max-w-screen-xl grid grid-cols-3 gap-2">
                {mockHomePageData.items.map((item) => <WhiteboardCard {...item}/>)}
            </div>
            <div className={"mx-auto max-w-screen-xl flex items-center justify-center py-4"}>
                <PaginationBlock
                    page={page}
                    pageCount={pageCount}
                    hasPreviousPage={hasPreviousPage}
                    hasNextPage={hasNextPage}
                    limit={limit}
                    itemsCount={itemsCount}/>
            </div>
        </>
    )

};

export default HomePage;