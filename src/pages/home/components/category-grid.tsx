import { useCategoryPagination } from "@/hooks"
import { AngleLeftIcon, AngleRightIcon } from "@/constants";
export function CategoryGrid() {
    const { paginatedData, loading, getNextPage, getPreviousPage, currentPage, totalPages } = useCategoryPagination();
    return (
        <div className="component-container">
            <div className="subtitle-container">
                <div className="red-block"></div>
                <div className="subtitle">Categories</div>
            </div>
            <div className="title-container">
                <div className="title">Browse By Category</div>
                <div>
                    <button className="arrowButton mr-1" onClick={() => getPreviousPage()} disabled={currentPage === 1} >{AngleLeftIcon}</button>
                    <button className="arrowButton" onClick={() => getNextPage()} disabled={currentPage===totalPages}>{AngleRightIcon}</button>
                </div>
            </div>


            <div>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="skeleton-card"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {paginatedData.map((category, index) => (
                            <div className="flex flex-col items-center justify-center category-card-container border-1 border-gray-400 rounded-sm p-4 hover:bg-red-600 hover:border-none hover:text-white" key={index}>
                                <svg className="w-10 h-10 dark:text-white mb-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2Z" />
                                </svg>

                                <div key={index} className="category-card text-center">
                                    {/* Render category details here */}
                                    {category.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}