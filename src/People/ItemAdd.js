import React from 'react';
import styled from 'styled-components';
import {config} from '../config'


const TextDiv = styled.div`
    margin-top: 175px;
    font-size: 25px;
    font-weight: 800;
    color: #676a6c;
`;
const ImageDiv = styled.div`
border-radius: 3px;
width: 350px;
height: 450px;
border: 1px solid #efefef;
background: #efefef;
justify-content: center;
display: flex;
overflow: hidden;
`;
const AddDiv = styled.div`
    display: flex;
    position: absolute;
    bottom: -20px;
`;
const AllContainer = styled.div`
display: flex;
flex-direction: column;
position: relative;
`;
const Img = styled.img`
 width: 350px;
height: 450px;
`;
export default class ItemAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            image: null,
            imagePreviewUrl: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createItem({
            image: this.state.image
        });
        // Clear the form and state for the next input.
        this.setState({image: null})
        this.setState({imagePreviewUrl: null})
    }

    handleImageChange(e) {
        e.preventDefault();
        this.setState({image: null})
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
        
        this.props.setImage(file)
       
    }

    render() {
        let $imagePreview = null;
        let { imagePreviewUrl } = this.state;
        console.log('image',typeof(this.props.imageUrl))
        if (typeof(this.props.imageUrl) === 'string' ){
         
        
        $imagePreview = (<Img src={config.image + this.props.imageUrl} className={'img-preview'} />);
    
        }
        else {
            if (imagePreviewUrl) {
            $imagePreview = (<Img src={imagePreviewUrl} className={'img-preview'} />);
        } else {
            $imagePreview = (<TextDiv className="previewText">Загрузите фото</TextDiv>);
        }
        }
        return (
            <AllContainer>
                <ImageDiv className="img-preview">
                    {$imagePreview}
                </ImageDiv>
                <AddDiv>
                    <input type="file" onChange={(e) => this.handleImageChange(e)} /> 
                    <form name="itemAdd" onSubmit={this.handleSubmit}>    
                    </form>
                </AddDiv>
            </AllContainer>
        );
    }
}