'use strict';

const makeRoundedCorners = function () {
  let roundedBlocks = []; //default array of sections
  let blocks = null; //default value need to be initialized
  let blockWidth = 0; // default width need to be initialized
  let maxItemsPerRow = 0; //default value need to be initialized
  let borderRadiusAmount = 0; //default value need to be initialized in px
  let previoslyStyled = []; //array of corners that was styled after init or resize adjustments

  //helper function
  function getCurentItemsPerRow() {
    const currentItemsPerRow = Math.floor(
      roundedBlocks.clientWidth / blockWidth
    );

    if (currentItemsPerRow === 0) return 1;
    return currentItemsPerRow;
  }

  // returns an array of indexes that shoould be changed
  function getIndexes() {
    const indexes = [];
    if (roundedBlocks.length === 0) return;

    const currentItemsPerRow = getCurentItemsPerRow();

    maxItemsPerRow = currentItemsPerRow;

    const rows = Math.ceil(blocks.length / maxItemsPerRow);
    // top left
    indexes.push(0);
    // top right
    if (rows === 1) {
      indexes.push(blocks.length - 1);
    } else {
      indexes.push(maxItemsPerRow - 1);
    }
    // bottom left
    indexes.push(maxItemsPerRow * (rows - 1));

    // bottom right
    indexes.push(blocks.length - 1);

    return indexes;
  }

  // applies border radius to specified corners. defaulr radius value = 0 for removing previosly applied astyles
  function styleCorners(tl, tr, bl, br, radius = 0) {
    previoslyStyled.length = 0;
    // top left
    blocks[tl].style.borderTopLeftRadius = `${radius}px`;
    // top right
    blocks[tr].style.borderTopRightRadius = `${radius}px`;
    // bottom left
    blocks[bl].style.borderBottomLeftRadius = `${radius}px`;
    // bottom right
    blocks[br].style.borderBottomRightRadius = `${radius}px`;

    previoslyStyled.push(tl, tr, bl, br);
  }

  return {
    init: function (blocksContainer, block, borderRadius) {
      // should be initialized on DOM loaded event with selectors and border radius amound (number in pexels)
      roundedBlocks = document.querySelector(`${blocksContainer}`);
      blocks = roundedBlocks.querySelectorAll(`${block}`);
      blockWidth = roundedBlocks.querySelector(`${block}`).clientWidth;
      borderRadiusAmount = borderRadius;

      styleCorners(...getIndexes(), borderRadiusAmount);
    },

    adjust: function () {
      // on resize method shoudl be called
      const currentItemsPerRow = getCurentItemsPerRow();
      if (
        maxItemsPerRow !== currentItemsPerRow &&
        blocks.length >= currentItemsPerRow
      ) {
        maxItemsPerRow = currentItemsPerRow;
        if (previoslyStyled.length > 0) styleCorners(...previoslyStyled);
        styleCorners(...getIndexes(), borderRadiusAmount);
      }
    },
  };
};

const roundedCorners = makeRoundedCorners();
const roundedCorners2 = makeRoundedCorners();
const roundedCorners3 = makeRoundedCorners();
const roundedCorners4 = makeRoundedCorners();

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  roundedCorners.init('.rc-blocks--1', '.rc-block--1', 50);
  roundedCorners2.init('.rc-blocks--2', '.rc-block--2', 50);
  roundedCorners3.init('.rc-blocks--3', '.rc-block--3', 50);
  roundedCorners4.init('.rc-blocks--4', '.rc-block--4', 50);
});

window.addEventListener('resize', () => {
  roundedCorners.adjust();
  roundedCorners2.adjust();
  roundedCorners3.adjust();
  roundedCorners4.adjust();
});
