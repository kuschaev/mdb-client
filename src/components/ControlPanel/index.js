// Core
import React from 'react';
// Instruments
import styled from 'styled-components';

const PanelContainer = styled.div`
    margin: 16px;
    height: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
`;
const MediaFormatSelector = styled.select`
    margin-left: 10px;
    width: 80px;
`;
const YearSelector = styled.select`
    margin-left: 10px;
    width: 60px;
`;

const ControlPanel = ({
    mediaFormats,
    mediaFormatChangeHandler,
    years,
    yearsChangeHandler
}) => {
    const handleMediaFormatSelectorChange = event =>
        mediaFormatChangeHandler(event.target.value);
    const handleYearSelectorChange = ({ target }) => {
        target.size = 1;
        target.blur();
        yearsChangeHandler(target.value);
    };

    const onSelectFocus = e => (e.target.size = 10);
    const onSelectBlur = e => (e.target.size = 1);

    return (
        <>
            <PanelContainer>
                <span>Select media type</span>
                <MediaFormatSelector
                    onChange={handleMediaFormatSelectorChange}
                    defaultValue={'movie'}
                >
                    {mediaFormats.map(format => (
                        <option value={format} key={format}>
                            {format.toLowerCase()}
                        </option>
                    ))}
                </MediaFormatSelector>
                <span>Select year of release</span>
                <YearSelector
                    onChange={handleYearSelectorChange}
                    defaultValue={2019}
                    onFocus={onSelectFocus}
                    onBlur={onSelectBlur}
                >
                    {years.map(year => (
                        <option value={year} key={year}>
                            {year}
                        </option>
                    ))}
                </YearSelector>
            </PanelContainer>
        </>
    );
};

export default ControlPanel;
