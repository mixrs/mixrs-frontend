import React, { useState, useEffect } from "react";
import "./Userbar.css";
import { getCurrentUser } from "../services/Users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Avatar from "antd/lib/avatar/avatar";
import { Badge } from "antd";

function Userbar() {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = () => {
    getCurrentUser().then((item) => {
      let data = item.data;
      if (!data) {
        return null;
      }

      setCurrentUser(data);
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchCurrentUser();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="Userbar">
      {currentUser ? (
        <div className="UserDetails">
          <Badge dot={true} status="success">
            <Avatar
              src={`data:image/png;base64, ${currentUser.image}`}
              size="large"
              className="UserImage"
            />
          </Badge>

          <div className="UserName">{currentUser.name}</div>
          <div className="UserDropdown">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Userbar;
