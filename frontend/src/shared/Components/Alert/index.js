import React from 'react'

import classnames from 'classnames'

function Alert(props) {
    return (
        <div class="alert alert-danger alert-zindex" role="alert">
            {props.error}
            {/* <span>
                Close
            </span> */}
        </div>
    )
}

export default Alert
