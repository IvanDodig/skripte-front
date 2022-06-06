import { Button, Pagination } from "rsuite";
import Link from "next/link";
import WithAuth from "../components/auth/withAuth";
import { useEffect, useState } from "react";
import { scriptServices } from "../services/scriptServices";
import LoadingScreen from "../components/UI/LoadingScreen/LoadingScreen";

const Home = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    scriptServices.getListOfScripts().then(res => {
      setList(res.data.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div id="all-scripts">
      <div className="filters">
        <input className="input" placeholder="Pretražite skripte" />
        <select className="dropdown">
          <option>Volvo</option>
          <option>Volvo</option>
          <option>Volvo</option>
          <option>Volvo</option>
        </select>
        <button className="button">Search</button>
      </div>
      {isLoading ? (
        <div style={{ width: "100%", textAlign: "center", margin: "10rem 0" }}>
          <LoadingScreen />
        </div>
      ) : (
        <>
          <div className="scripts-list">
            {list.map(script => (
              <Link href={"/" + script.id}>
                <div className="script">
                  <div className="image"></div>
                  <div className="content">
                    <h4 className="title">{script.title}</h4>
                    <div className="author-date">{script.created_at}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
            }}>
            <Pagination
              total={100}
              limit={10}
              activePage={1}
              size="lg"
              onChangePage={() => {}}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WithAuth(Home);
