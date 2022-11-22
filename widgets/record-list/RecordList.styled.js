import styled from "styled-components";

const RecordListContainer = styled.div`
.ant-list-item {
    background: #c2e3f3;
    border-radius: 5px;
    padding-left: 8px;
    margin-bottom: 8px;

    .ant-list-item-action > li > a {
        color: #164587;
        text-decoration: none;
    }

    .ant-list-item-meta-title {
        font-weight: 700;
    }

    .ant-list-item-meta-title, .ant-list-item-meta-description {
        color: #d4d4d4;
    }
}
`;

export default RecordListContainer;