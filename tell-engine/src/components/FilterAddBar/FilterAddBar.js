import React, {Component} from 'react';

import './filter-add-bar.less';

class FilterAddBar extends Component {
    render() {
        return (
            <div className={'FilterAddBar'}>
                <div className={'FilterAddBar-Filter'}>
                    <div className={"FilterAddBar-Filter-Icon"}>
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 12H10C10.55 12 11 11.55 11 11C11 10.45 10.55 10 10 10H8C7.45 10 7 10.45 7 11C7 11.55 7.45 12 8 12ZM0 1C0 1.55 0.45 2 1 2H17C17.55 2 18 1.55 18 1C18 0.45 17.55 0 17 0H1C0.45 0 0 0.45 0 1ZM4 7H14C14.55 7 15 6.55 15 6C15 5.45 14.55 5 14 5H4C3.45 5 3 5.45 3 6C3 6.55 3.45 7 4 7Z"
                                fill="black"/>
                        </svg>
                    </div>
                    <div className={"FilterAddBar-Filter-Text"}>Фильтр поиска</div>
                </div>
                <div className={"FilterAddBar-Add"}>
                    <div className={"FilterAddBar-Add-Text"}>Нашли вещь?</div>
                    <div className={"FilterAddBar-Add-Icon"}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM13 10H10V13C10 13.55 9.55 14 9 14C8.45 14 8 13.55 8 13V10H5C4.45 10 4 9.55 4 9C4 8.45 4.45 8 5 8H8V5C8 4.45 8.45 4 9 4C9.55 4 10 4.45 10 5V8H13C13.55 8 14 8.45 14 9C14 9.55 13.55 10 13 10Z" fill="black"/>
                    </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterAddBar;