import { createGlobalStyle } from 'styled-components'
import { lighten } from 'polished'

import { theme } from '@utils'

const tableStyle = `
  .ant-table-pagination.ant-pagination {
    margin: 20px 0;
    text-align: center;
  }

  .ant-table-thead > tr > th {
    transition: background 0.1s ease;
    color: #c6c6cb;
    padding: 6px 16px;
    border-bottom: 0;
  }
  .ant-table-tbody>tr>td {
    background-color: white;
  }

  .ant-table-thead > tr > th:nth-child(even) {
    background-color: #65647a;
  }
  .ant-table-thead > tr > th:nth-child(odd) {
    background-color: #717085;
  }

  .ant-table-thead > tr.ant-table-row-hover > td,
  .ant-table-tbody > tr.ant-table-row-hover > td,
  .ant-table-thead > tr:hover > td,
  .ant-table-tbody > tr:hover > td {
    background-color: #fffee6;
  }
  .ant-table-tbody > tr > td {
    transition: none;
  }
`

const AntOverWrite = createGlobalStyle`
  .ant-table-thead > tr.ant-table-row-hover > td,
  .ant-table-tbody > tr.ant-table-row-hover > td,
  .ant-table-thead > tr:hover > td,
  .ant-table-tbody > tr:hover > td {
  background-color: #fffee6;
  }

  .react-calendar-heatmap rect:hover {
  stroke: #51abb2;
  }

  .react-calendar-heatmap-month-label {
  fill: #c6dbde;
  font-size: 0.7em;
  }

  .react-calendar-heatmap .color-scale-1 {
  fill: #dbe290;
  }
  .react-calendar-heatmap .color-scale-2 {
  fill: #99c06f;
  }
  .react-calendar-heatmap .color-scale-3 {
  fill: #609d4c;
  }
  .react-calendar-heatmap .color-scale-4 {
  fill: #61793e;
  }
  .react-calendar-heatmap .color-scale-5 {
  fill: #37642c;
  }
  .react-calendar-heatmap .color-empty {
  fill: ${theme('heatmap.empty')};
  }
  .comment-editor {
  .public-DraftEditor-content {
  min-height: 150px;
  font-size: 1.3em;
  color: #acadad;
  }
  }
  .comment-reply-editor {
  .public-DraftEditor-content {
  min-height: 200px;
  font-size: 0.9em;
  color: #acadad;
  }
  }

  .public-DraftEditor-content {
  min-height: 500px;
  font-size: 1.3em;
  color: #acadad;
  }

  .typewriter-mention {
  color: #575f67;
  cursor: pointer;
  display: inline-block;
  background: #fffddb;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 2px;
  text-decoration: none;
  }
  .typewriter-mention:hover,
  .typewriter-mention:focus {
  color: #677584;
  background: #fffddb;
  outline: 0; /* reset for :focus */
  }

  .typewriter-suggestions {
  border: 1px solid #eee;
  margin-top: 10px;
  position: absolute;
  min-width: 220px;
  max-width: 440px;
  background: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0px 2px 10px 1px rgba(235, 235, 235, 1);
  -moz-box-shadow: 0px 2px 10px 1px rgba(235, 235, 235, 1);
  box-shadow: 0px 2px 10px 1px rgba(235, 235, 235, 1);
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: 2;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  box-sizing: border-box;
  -webkit-transform: scale(0);
  transform: scale(0);
  }
  .typewriter-mentionSuggestionsEntry {
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  padding: 7px 10px 3px 10px;
  padding-left: 10px;
  display: flex;
  }
  .typewriter-mentionSuggestionsEntry:active {
  background-color: #cce7ff;
  }
  .typewriter-mentionSuggestionsEntryFocused {
  background-color: #e6f3ff;
  padding: 7px 10px 3px 10px;
  display: flex;
  }

  .typewriter-mentionSuggestionsEntryText {
  display: inline-block;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 368px;
  font-size: 1.1rem;
  margin-bottom: 0.2em;
  color: #6d999d;
  }

  .typewriter-mentionSuggestionsEntryAvatar {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  }
  ${tableStyle};

  .ant-modal-mask {
  background-color: rgba(0, 0, 0, 0.15) !important;
  }

  // ----
  // popover
  .ant-popover-inner-content {
  padding: 0;
  }
  .ant-popover .ant-popover-content .ant-popover-inner {
  background: tomato;
  }

  .ant-popover-inner {
  background: tomato !important;
  }

  // popover end

  .ant-checkbox-wrapper {
  color: #87c5ca;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
  border-color: #51abb2;
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
  background-color: #51abb2;
  border-color: #51abb2;
  }

  .ant-checkbox-inner {
  border-radius: 8px;
  transition: all 0.2s;
  }

  .ant-divider-horizontal.ant-divider-with-text {
  color: lightgrey;
  }

  .ant-radio-wrapper {
  color: grey;
  }
  .ant-radio-wrapper-checked {
  color: ${theme('button.primary')};
  }

  .ant-radio-checked .ant-radio-inner {
  border-color: ${theme('button.primary')} !important;
  margin-top: 50px;
  }

  .ant-radio-inner:after {
  background-color: ${theme('button.primary')} !important;
  }

  // pagination overides
  .ant-pagination-item:focus,
  .ant-pagination-item:hover {
  border-color: ${theme('button.primary')};
  }
  .ant-pagination-item {
  border-radius: 50%;
  background-color: ${theme('pagination.item_bg')};
  border-color: ${theme('pagination.item_border_color')};
  }

  .ant-pagination-item a {
  color: ${theme('pagination.inactive_num')};
  }

  .ant-pagination-prev a,
  .ant-pagination-next a {
  color: ${theme('pagination.text')};
  }

  .ant-pagination-prev a:hover,
  .ant-pagination-next a:hover {
  font-weight: bold;
  }

  .ant-pagination-disabled a,
  .ant-pagination-disabled:hover a,
  .ant-pagination-disabled:focus a,
  .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination-disabled:hover .ant-pagination-item-link,
  .ant-pagination-disabled:focus .ant-pagination-item-link {
  color: ${theme('pagination.disable_text')};
  }

  .ant-pagination-item-active {
  background: ${theme('button.primary')};
  border-radius: 50%;
  border-color: ${theme('button.primary')};
  }

  .ant-pagination-item-active a {
  color: white;
  font-size: 1.1em;
  }
  // pagination end

  .ant-btn-background-ghost.ant-btn-primary {
  color: ${theme('button.primary')};
  border-color: ${theme('button.primary')};
  }

  .ant-btn:focus,
  .ant-btn:hover {
  background-color: ${theme('button.hoverBg')};
  }
  .ant-btn:active {
  background-color: ${theme('button.activeBg')};
  }

  .ant-btn-primary {
  color: ${theme('button.fg')};
  background-color: ${theme('button.primary')};
  border-color: ${theme('button.primary')};
  }
  .ant-btn-primary.disabled,
  .ant-btn-primary[disabled],
  .ant-btn-primary.disabled:hover,
  .ant-btn-primary[disabled]:hover,
  .ant-btn-primary.disabled:focus,
  .ant-btn-primary[disabled]:focus,
  .ant-btn-primary.disabled:active,
  .ant-btn-primary[disabled]:active,
  .ant-btn-primary.disabled.active,
  .ant-btn-primary[disabled].active {
  color: white;
  }

  .ant-btn-red:hover {
  background-color: ${lighten(0.1, 'tomato')};
  border-color: ${lighten(0.1, 'tomato')};
  color: white;
  }

  .ant-btn-red:active {
  background-color: ${lighten(0.1, 'tomato')};
  border-color: ${lighten(0.1, 'tomato')};
  }
  .ant-btn-red:focus {
  background-color: ${lighten(0.2, 'tomato')};
  border-color: ${lighten(0.2, 'tomato')};
  }

  .ant-btn-red {
  }
  .ant-btn-background-ghost.ant-btn-red {
  color: tomato;
  border-color: tomato;
  }

  .ant-btn-clicked:after {
  border: ${theme('button.clicked')};
  }

  .ant-tabs-bar {
  border-bottom: ${theme('taber.baseline')};
  }
  .ant-tabs-ink-bar {
  background-color: ${theme('taber.bottom_bar')};
  }
  .ant-tabs-nav .ant-tabs-tab {
  color: ${theme('taber.normalText')};
  }
  .ant-tabs-nav .ant-tabs-tab-active {
  color: ${theme('taber.activeText')};
  font-weight: bold;
  }

  .ant-tabs.ant-tabs-card .ant-tabs-bar .ant-tabs-tab-active {
  color: ${theme('taber.activeText')};
  font-weight: bold;
  }

  ul {
  margin-bottom: 0;
  }

  .ant-tag,
  .ant-tag a,
  .ant-tag a:hover {
  color: #dac49c;
  }
  .ant-tag {
  border: 1px solid #707084;
  background: #707084;
  }
  .ant-tag .anticon-cross {
  color: gold;
  }
`

export default AntOverWrite
