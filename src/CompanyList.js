import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import JoblyApi from "./api";
import Searchbar from "./Searchbar";
import CompanyCard from "./CompanyCard";

/** Renders CompanyList component containing CompanyCards.
 *
 * App -> CompanyList -> CompanyCard(s)
 */
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getCompaniesOnRender() {
    async function getCompanies() {
      const companiesData = await JoblyApi.getCompanies();
      setCompanies(companiesData);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  async function searchCompanies(searchParam) {
    setIsLoading(true);
    const companiesData = searchParam
      ? await JoblyApi.getCompanies({
          nameLike: searchParam,
        })
      : await JoblyApi.getCompanies();
    setCompanies(companiesData);
    setIsLoading(false);
  }

  return (
    <>
      <h1>Companies</h1>
      <Searchbar searchType={"company"} search={searchCompanies} />
      {isLoading === true ? (
        <p>Loading...</p>
      ) : (
        <>
          {companies.map((c) => (
            <CompanyCard key={uuid()} company={c} />
          ))}
        </>
      )}
    </>
  );
}

export default CompanyList;
