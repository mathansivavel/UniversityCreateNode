import './Home.css';
import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import PaginationComp from './PaginationComp';
import axios from 'axios';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core';
import EditModal from './EditModal';
import Banner from './Banner';
import * as qs from 'qs'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardAlign: {
        display: "inline-block",
        margin: "35px",
        alignContent: "center"
    },
    contents: {
        width: "100%",
        textAlign: "center",
        marginTop: "150px",
    },
    pageNumAlign: {
        width: "100%",
        textAlign: "center",
    }

}));

function Home() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [univPerPage, setUnivPerPage] = useState(3);
    const [searchQuery, setSearchQuery] = useState("");
    const [country, setCountry] = useState([""]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [crudActions, setCrudActions] = useState("");
    const [banners, setBanners] = useState(false);
    const [bannersValue, setBannersValue] = useState("");
    const [bannerType, setBannerType] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5000/data")
            .then(res => res.json())
            .then((res) => {
                console.log("sdd", res)
                setIsLoaded(true);
                setUniversities(res);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });

        fetch("http://127.0.0.1:5000/country")
            .then(res => res.json())
            .then((res) => {
                setCountry(res);
            }, (error) => {
                setError(error);
            });

    }, []);

    const indexOfLastUniv = currentPage * univPerPage;
    const indexOfFirstUniv = indexOfLastUniv - univPerPage;
    const currentUniv = universities.slice(indexOfFirstUniv, indexOfLastUniv);

    const renderUniversities = currentUniv[0] === undefined ? <div className={classes.cardAlign}><h3>No Data found</h3></div>
        : currentUniv.map((university, index) => {
            return (
                <div className={classes.cardAlign}>
                    <Cards key={index} name={university.name} domain={university.domain}
                        country={university.country} description={university.descrip}
                        web_page={university.web_page} >
                    </Cards>
                </div>
            );
        });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(universities.length / univPerPage); i++) {
        pageNumbers.push(i);
    }

    function handleChange(newValue) {
        setCurrentPage(newValue);
    }

    function removeSelectedCountry(newValue) {
        const selectedCountryNew = selectedCountry.filter(data => data !== newValue);
        console.log("inside remove");
        setSelectedCountry(selectedCountryNew);
    }

    function handleCountryChange(newValue) {
        console.log("selectedCountry from state", selectedCountry);
        console.log("New selectedcountry value", newValue);
        console.log("selectedCountry.length from state", selectedCountry.length);
        var multiCountryFlag = true;
        selectedCountry.map(selectedCountry => {
            if (selectedCountry === newValue) {
                multiCountryFlag = false
                return multiCountryFlag;
            }
        });
        if (multiCountryFlag && selectedCountry.length > 1) {
            setSelectedCountry(selectedCountry => selectedCountry.concat(newValue));
        }
        else if (selectedCountry.length > 1 && !multiCountryFlag) {
            selectedCountry.map(selectedCountry => {
                console.log("inside selected country .length > 1", selectedCountry);
                if (selectedCountry === newValue) {
                    console.log("inside if ", selectedCountry);
                    removeSelectedCountry(newValue);
                }

            });
        }
        else if (selectedCountry[0] === newValue) {
            console.log("inside else if ", selectedCountry);
            removeSelectedCountry(newValue);
        }
        else {
            console.log("selectedCountry[0] in else", selectedCountry[0]);
            setSelectedCountry(selectedCountry => selectedCountry.concat(newValue));
        }

    }
    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <PaginationComp number={number} onChange={handleChange} />

        );
    });

    function handleSearchQueryChanges(e) {
        console.log("inside onchange", searchQuery);
        setSearchQuery(e.target.value);
    }
    function handleSearch(e) {
        e.preventDefault();
        console.log("sdasd", selectedCountry);

        axios.get("http://127.0.0.1:5000/searchQuery", {
            params: {
                data : {
                    "searchVal": searchQuery,
                    "filterVal": selectedCountry
                }
             
            }
        })
            .then((res) => {
                console.log("sasdd", res.data)
                setIsLoaded(true);
                setUniversities(res.data);
                setCurrentPage(1);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
                setCurrentPage(1);
            });
    }
    function showEditModal() {
        setOpen(true);
        setCrudActions("Edit");
    }
    const closeEditModal = () => {
        setOpen(false);
        setCrudActions("");
    };
    function showDeleteModal() {
        setOpen(true);
        setCrudActions("Delete");
    }
    const closeDeleteModal = () => {
        setOpen(false);
        setCrudActions("");
    };
    function showAddModal() {
        setOpen(true);
        setCrudActions("Add");
    }
    const closeAddModal = () => {
        setOpen(false);
        setCrudActions("");
    };

    function handleEdit(editUniversity, newUnivName) {

        axios.post("http://127.0.0.1:5000/editName", {
            editName: newUnivName,
            oldName: editUniversity
        }).then((res) => {
            console.log(res);
            closeEditModal();
            if (res.data.data === "University updated Successfully") {
                setBanners(true);
                setBannersValue(res.data.data);
                setBannerType("success");
            }
            else if (res.data.data === "University Name Already Exists") {
                setBanners(true);
                setBannersValue(res.data.data);
                setBannerType("error");
            }
            window.setInterval(function () { window.location.reload() }, 500);

        }, (error) => {
            setIsLoaded(true);
            setError(error);
        });
    }

    function handleDelete(editUniversity) {
            console.log("editUniversity", editUniversity)
        axios.post("http://127.0.0.1:5000/deleteName", {
            oldName: editUniversity
        }).then((res) => {
            console.log(res);
            closeDeleteModal();
            if (res.data.data === "University deleted Successfully") {
                setBanners(true);
                setBannersValue(res.data.data);
                setBannerType("success");
            }
            window.setInterval(function () { window.location.reload() }, 500);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        });
    }

    function handleAdd(formData) {
        axios.post("http://127.0.0.1:5000/addUniversity", { formData }).then((res) => {
            console.log("addddddddd response",res.data.data);
            closeAddModal();
            if (res.data.data === "University Added Successfully") {
                console.log("inside")
                setBanners(true);
                setBannersValue(res.data.data);
                setBannerType("success");
                closeAddModal();
            }
            else if (res.data.data === "University Name Already Exists") {
                setBanners(true);
                setBannersValue(res.data.data);
                setBannerType("error");
            }
            window.setInterval(function () { window.location.reload() }, 500);
        }, (error) => {
            setError(error);
        });
    }

    function handleCloseBanner(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setBanners(false);
    }


    if (isLoaded) {
        return (
            <div className={classes.root}   >
                <Navbar
                    handleSearch={handleSearch}
                    handleSearchQueryChanges={handleSearchQueryChanges}
                    data={country}
                    selectedData={selectedCountry}
                    onCountryChange={handleCountryChange}
                    showEditModal={showEditModal}
                    showAddModal={showAddModal}
                    showDeleteModal={showDeleteModal}
                />
                { banners ? <Banner open={banners} handleCloseBanner={handleCloseBanner}
                    bannersValue={bannersValue} bannerType={bannerType} /> : null}
                { open ? <EditModal handleClose={closeEditModal} open={open} handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    crudActions={crudActions}
                    handleAdd={handleAdd} /> : null}
                <div className={classes.contents}>
                    {renderUniversities}
                </div>
                <div className={classes.pageNumAlign}>
                    {renderPageNumbers}
                </div>
            </div>
        );
    }
    else if (error) {
        return (<div className={classes.root}   >
            <Navbar
                handleSearch={handleSearch}
                handleSearchQueryChanges={handleSearchQueryChanges}
                data={country}
                selectedData={selectedCountry}
                onCountryChange={handleCountryChange}
                showEditModal={showEditModal}
                showAddModal={showAddModal}
                showDeleteModal={showDeleteModal}
            />
            { banners ? <Banner open={banners} handleCloseBanner={handleCloseBanner}
                bannersValue={bannersValue} bannerType={bannerType} /> : null}
            { open ? <EditModal handleClose={closeEditModal} open={open} handleEdit={handleEdit}
                handleDelete={handleDelete}
                crudActions={crudActions}
                handleAdd={handleAdd} /> : null}
            <Banner open={true} handleCloseBanner={handleCloseBanner}
                bannersValue={"OOPS!!!! Server is down"} bannerType={"error"} />
        </div>);
    }
    else {
        return (<div className={classes.root}   >
            <Navbar
                handleSearch={handleSearch}
                handleSearchQueryChanges={handleSearchQueryChanges}
                data={country}
                selectedData={selectedCountry}
                onCountryChange={handleCountryChange}
                showEditModal={showEditModal}
                showAddModal={showAddModal}
                showDeleteModal={showDeleteModal}
            />
            <h6>Something Wrong</h6>
        </div>);

    }


}

export default Home;
