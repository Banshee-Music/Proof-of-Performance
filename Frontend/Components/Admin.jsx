import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import {
  UPLOAD_IPFS_IMAGE,
  UPLOAD_METADATA,
  copyText,
} from "../Context/constants";
import { useStateContext } from "../Context/index";

import { Admin_1, Admin_2, Admin_3 } from "../Components/SVG/index";
import Input from "../Components/Input";

const Admin = ({ setAdmin }) => {
  const { setLoader, address, ALL_NOTIFICATIONS } = useStateContext();
  const [openAirdropList, setOpenAirdropList] = useState(false);
  const [ipfs, setIpfs] = useState();

  const [nft, setNft] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
  });

  const onDrop = useCallback(async (acceptedFile) => {
    setLoader(true);
    const image = await UPLOAD_IPFS_IMAGE(acceptedFile[0]);
    setNft({ ...nft, image: image });
    console.log(image);
    setLoader(false);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxSize: 500000000000,
  });

  const UPLOADING_METADATA = async (nft) => {
    try {
      setLoader(true);
      const metadata = await UPLOAD_METADATA(nft, address);
      if (metadata) {
        setIpfs(metadata);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const [airdrops, setAirdrops] = useState();
  useEffect(() => {
    const load = async () => {
      const airdropsLists = JSON.parse(localStorage.getItem("NFTS_AIRDROPS"));
      if (!airdropsLists || airdropsLists.length === 0) return [];

      setAirdrops(airdropsLists);

      const notifications = await ALL_NOTIFICATIONS();
      console.log(notifications);
    };
    load();
  }, []);
  return (
    <div className="new-loader-wrapper">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-logo">
            <span className="logo-circle">
              <Admin_1 />
            </span>
          </div>
          <button className="btn-close" onClick={() => setAdmin(false)}>
            <Admin_2 />
          </button>
        </div>
        {/* //UPLOAD */}
        {openAirdropList ? (
          <>
            <div class="table-container">
              <table class="responsive-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>IPFS_URL</th>
                  </tr>
                </thead>
                <tbody>
                  {airdrops?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img src={item?.image} alt="Sample Image" />
                      </td>
                      <td>{item?.name}</td>
                      <td>
                        <button
                          className="btn-primary"
                          onClick={() => copyText(item?.IPFS_URL)}
                        >
                          Copy URL
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setAdmin(false)}>
                Cancel
              </button>
              {airdrops?.length && (
                <button
                  className="btn-primary"
                  onClick={() => setOpenAirdropList(!openAirdropList)}
                >
                  Upload MetaData
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="modal-body">
              {nft.image ? (
                <div>
                  <img
                    style={{ width: "150px", height: "auto" }}
                    src={nft.image}
                    alt=""
                  />
                </div>
              ) : (
                <>
                  <p className="modal-title">Upload a file</p>
                  <button className="upload-area" {...getRootProps()}>
                    <span className="upload-area-icon">
                      <Admin_3 />
                    </span>
                    <span className="upload-area-title">
                      Drag file(s) here to upload.
                    </span>
                    <span className="upload-area-description">
                      Alternatively, you can select a file by <br />
                      <input id="file" type="file" {...getInputProps()} />
                      <strong>clicking here</strong>
                    </span>
                  </button>
                </>
              )}

              <Input
                name={"Name"}
                handleChange={(e) => setNft({ ...nft, name: e.target.value })}
              />
              <Input
                name={"Description"}
                handleChange={(e) =>
                  setNft({ ...nft, description: e.target.value })
                }
              />
              <Input
                name={"Category"}
                handleChange={(e) =>
                  setNft({ ...nft, category: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setAdmin(false)}>
                Cancel
              </button>
              {airdrops?.length && (
                <button
                  className="btn-primary"
                  onClick={() => setOpenAirdropList(!openAirdropList)}
                >
                  MetaData List
                </button>
              )}
              <button
                className="btn-primary"
                onClick={() => UPLOADING_METADATA(nft, address)}
              >
                Upload File
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
