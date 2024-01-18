import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdArrowRightAlt } from 'react-icons/md';
import Button from '../../MainPageComponents/Button/Button';
import Modal from '../../MainPageComponents/Modal/Modal';
import Input from '../Input/Input';
import './Search.scss';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate()

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/', { state: searchInput?.search })
        setModalOpen(false);
        setSearchInput('')
    };

    const handleChange = (name, value) => {
        setSearchInput((prev) => ({ ...prev, [name]: value }));
    };

    const bodyContent = (
        <form className='searchbody'>
            <Input name='search' type='text' value={searchInput.search} onChange={handleChange} />
            <Button title='Search' glow={false} icon={<MdArrowRightAlt size={25} />} onClick={onSubmit} />
        </form>
    );

    return (
        <div className='search'>
            <Button title="Search your courses" glow={false} classname="searchbtn" color="black" icon={<CiSearch size={25} />} onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} title='Search Courses' subTitle='Search all courses you want to start' bodyContent={bodyContent} />
        </div>
    );
};

export default Search;
