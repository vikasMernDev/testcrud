import React, { useEffect, useState } from 'react';
import './list.css'

function ColorList() {
    const [colors, setColors] = useState([])
    const [filterList, setFilterList] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const filtered = colors?.filter(item =>
          item.hex.includes(searchTerm)
        );
        setFilterList(filtered.slice(0, 100));
      };

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
        if (event.key === 'Backspace') {
            setSearchTerm('');
          }
      };
    //   const data = searchTerm === '' ? colors : filterList
      const fetchColrs = async () => {
          await fetch("https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json")
              .then((res) => res.json())
              .then((data) => setColors(data.colors))
      }
    useEffect(() => {
        fetchColrs();
    }, [])

    return (
        <div className='colors-list'>
            <div className='list-heading'>
                <h4>Colors List</h4>
            </div>
            <div className='search-bar'>
                <input
                    type="text"
                    className='search-input'
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div>
                <table id='customers'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Color Name</th>
                            <th>Color Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchTerm === '' ? 
                          (  colors.length > 0 ? colors.map((item, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.color}</td>
                                    <td>{item.hex}</td>
                                </tr>
                            ))
                            :
                            <li>Invaild color</li>)
                            :
                            filterList.length > 0 ? filterList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.color}</td>
                                    <td>{item.hex}</td>
                                </tr>
                            ))
                            :
                            <li>Invaild color</li>
                        }
                        {/* {
                            data.length > 0 ? data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.color}</td>
                                    <td>{item.hex}</td>
                                </tr>
                            ))
                            :
                            <li>Invaild color</li>
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ColorList