import React from "react";

const Like = ({ like, onLike }) => {
  return (
    <div onClick={onLike} style={{ cursor: "pointer" }}>
      {like ? (
        <i className="fa fa-heart" aria-hidden="true" />
      ) : (
        <i className="fa fa-heart-o" aria-hidden="true" />
      )}
    </div>
  );
};

export default Like;

// class Like extends Component {
//   render() {
//     return (
//       <div onClick={this.props.onLike} style={{ cursor: "pointer" }}>
//         {this.props.like ? (
//           <i className="fa fa-heart" aria-hidden="true" />
//         ) : (
//           <i className="fa fa-heart-o" aria-hidden="true" />
//         )}
//       </div>
//     );
//   }
// }

// export default Like;
