import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify-icons/mdi/chevron-left";
import chevronRight from "@iconify-icons/mdi/chevron-right";
import arrowDown from "@iconify-icons/mdi/arrow-down";
import arrowUp from "@iconify-icons/mdi/arrow-up";
import chevronDoubleLeft from "@iconify-icons/mdi/chevron-double-left";
import chevronDoubleRight from "@iconify-icons/mdi/chevron-double-right";
import Loader from "../components/Loader";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetchData();
  }, [filters, currentPage]);

  useEffect(() => {
    if (sortConfig.key !== null) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  }, [sortConfig]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/data", {
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage,
        filters,
      });
      setData(response.data.data);
      console.log(response.data.data);
      setFilteredData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = data.filter((item) => {
      return Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to first page after filter
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key, direction) => {
    if (sortConfig.key === key && sortConfig.direction === direction) {
      direction = direction;
    }
    setSortConfig({ key, direction });
  };

  const currentItems = filteredData.slice(0, 10);

  if (!filteredData || filteredData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="m-10">
      <div className="flex flex-wrap items-center gap-1">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by interest, profession or location"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 mb-4 border rounded-md outline-none"
        />
        {/* Filter */}
        <select
          name="gender"
          onChange={handleFilter}
          className="px-4 py-2 mb-4 border rounded-md outline-none block appearance-none  bg-white border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
        </select>
        <select
          name="ownsCar"
          onChange={handleFilter}
          className="px-4 py-2 mb-4 border rounded-md outline-none block appearance-none  bg-white border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Owns Car</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
        <select
          name="isHomeOwner"
          onChange={handleFilter}
          className="px-4 py-2 mb-4 border rounded-md outline-none block appearance-none  bg-white border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Owns Home</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
        <select
          name="indebt"
          onChange={handleFilter}
          className="px-4 py-2 mb-4 border rounded-md outline-none block appearance-none  bg-white border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">In Debt</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      </div>

      {/* Table */}
      <div className="w-[80vw] overflow-x-scroll mx-auto">
        <table className="table-auto border-collapse border">
          <thead className="bg-gray-100">
            <tr className="text-[12px] md:text-[15px]">
              <th className="flex items-center justify-center m-auto gap-1 px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Age{" "}
                <Icon
                  className="cursor-pointer"
                  icon={arrowDown}
                  onClick={() => handleSort("age", "asc")}
                ></Icon>{" "}
                <Icon
                  className="cursor-pointer"
                  icon={arrowUp}
                  onClick={() => handleSort("age", "desc")}
                />
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Gender
              </th>
              <th className="flex items-center justify-center m-auto gap-1 px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                TimeSpent{" "}
                <Icon
                  className="cursor-pointer"
                  icon={arrowDown}
                  onClick={() => handleSort("timeSpent", "asc")}
                ></Icon>{" "}
                <Icon
                  className="cursor-pointer"
                  icon={arrowUp}
                  onClick={() => handleSort("timeSpent", "desc")}
                />
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Platform
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Interests
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Location
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Demographics
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Profession
              </th>
              <th className="flex items-center justify-center m-auto gap-1 px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Income{" "}
                <Icon
                  className="cursor-pointer"
                  icon={arrowDown}
                  onClick={() => handleSort("income", "asc")}
                ></Icon>{" "}
                <Icon
                  className="cursor-pointer"
                  icon={arrowUp}
                  onClick={() => handleSort("income", "desc")}
                />
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                Indebt
              </th>
              <th className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                OwnsHome
              </th>
              <th className="px-4 py-2 w-[100%] text-left text-xs md:text-sm font-medium text-gray-600 uppercase">
                OwnsCar
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="text-[12px] md:text-[15px] bg-white">
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.age}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.gender}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.timeSpent}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.platform}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.interests}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.location}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.demographics}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.profession}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.income}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.indebt}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.isHomeOwner}
                </td>
                <td className="px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600 border-[1px] border-gray-200">
                  {item.ownsCar}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => handlePagination(1)}
          disabled={currentPage === 1}
          className="w-[24px] h-[24px] bg-gray-200 rounded-[50%] flex items-center justify-center"
        >
          <Icon icon={chevronDoubleLeft} color="black" fontSize={20} />
        </button>
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-[28px] h-[28px] bg-gray-200 rounded-[50%] flex items-center justify-center"
        >
          <Icon icon={chevronLeft} color="black" fontSize={20}></Icon>
        </button>
        <button className="w-[32px] h-[32px] bg-gray-200 rounded-[50%] flex items-center justify-center font-bold">
          {currentPage}
        </button>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-[28px] h-[28px] bg-gray-200 rounded-[50%] flex items-center justify-center"
        >
          <Icon icon={chevronRight} color="black" fontSize={20}></Icon>
        </button>
        <button
          onClick={() => handlePagination(totalPages)}
          disabled={currentPage === totalPages}
          className="w-[24px] h-[24px] bg-gray-200 rounded-[50%] flex items-center justify-center disabled:bg-gray-50"
        >
          <Icon icon={chevronDoubleRight} color="black" fontSize={20}></Icon>
        </button>
      </div>
    </div>
  );
};

export default Table;
