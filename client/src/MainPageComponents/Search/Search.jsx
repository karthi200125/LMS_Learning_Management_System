import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdArrowRightAlt } from 'react-icons/md';
import Button from '../../MainPageComponents/Button/Button';
import Modal from '../../MainPageComponents/Modal/Modal';
import Input from '../Input/Input';
import './Search.scss';

const Search = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState({ search: '' });
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            console.log(searchInput);
            setModalOpen(false);
        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (name, value) => {
        setSearchInput((prev) => ({ ...prev, [name]: value }));
    };

    const bodyContent = (
        <form className='searchbody'>
            <Input name='search' type='text' value={searchInput.search} onChange={handleChange} />
            <Button title='Search' glow={false} icon={<MdArrowRightAlt size={25} />} onClick={onSubmit} isLoading={isLoading} />
        </form>
    );

    return (
        <div className='search'>
            <Button title="Search your courses" glow={false} classname="transparent" color="black" icon={<CiSearch size={25} />} onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} title='Search Courses' subTitle='Search all courses you want to start' bodyContent={bodyContent} />
        </div>
    );
};

export default Search;
