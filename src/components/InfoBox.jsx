import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const InfoBox = ({ isInfoBoxOpen, setIsInfoBoxOpen }) => {


    return (

        <>

            <div className='overlay'>

                <section className='info-box'>

                    <button
                        className='close-button'
                        onClick={() => { setIsInfoBoxOpen(!isInfoBoxOpen) }}
                    >

                        <span className='material-symbols-rounded close-icon'>
                            close
                        </span>

                    </button>

                    <p className='info-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quo adipisci modi corporis officia, debitis natus deserunt quibusdam incidunt! Omnis accusantium nam dolor animi fuga voluptas rerum harum error molestias cumque molestiae facere magni voluptatum aliquam magnam sit doloribus sequi ut, quidem autem ad ullam et consequuntur veniam. Id provident impedit quam maiores modi quod dolor at, earum vitae. Asperiores, possimus? Adipisci ducimus eligendi aliquid maxime debitis libero delectus deleniti, dolor dolorum ab numquam, quod dolores ratione provident laborum at sint temporibus molestias eum? Autem, velit recusandae reiciendis tenetur saepe illo voluptas magnam officia eius iste consequatur quaerat cumque nam.</p>

                    <Link className='github-link' to='https://github.com/dreweloper' target='_blank'>

                        <i className='devicon-github-original'></i>

                    </Link>

                </section>

            </div>

        </>

    );

};

InfoBox.propTypes = {
    isInfoBoxOpen: PropTypes.bool.isRequired,
    setIsInfoBoxOpen: PropTypes.func.isRequired
};

InfoBox.defaultProps = {
    isInfoBoxOpen: false
};