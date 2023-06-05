// face->GDP hair->hale eyebrow->electric mouth->cooking fuel

function createFace(faceData, gElem, centroid, size = 20) {
  var face = gElem;

  var faceColor;
  if (!faceData) return;
  switch (faceData.face) {
    case 1:
      faceColor = "#23c552";
      break;
    case 2:
      faceColor = "white";
      break;
    case 3:
      faceColor = "#f84f31";
      break;
  }

  // 确定眉毛的起始位置和结束位置
  var leftStart = [centroid[0] - size * 0.5, centroid[1] - size * 0.5];
  var leftControl = [centroid[0] - size * 0.25, centroid[1] - size * 0.65];
  var leftEnd = [centroid[0] - size * 0.1, centroid[1] - size * 0.5];
  var leftEnd2 = [centroid[0] - size * 0.2, centroid[1] - size * 0.4];
  var rightStart = [centroid[0] + size * 0.1, centroid[1] - size * 0.5];
  var rightStart2 = [centroid[0] + size * 0.2, centroid[1] - size * 0.4];
  var rightControl = [centroid[0] + size * 0.25, centroid[1] - size * 0.65];
  var rightEnd = [centroid[0] + size * 0.5, centroid[1] - size * 0.5];
  var rightEnd2 = [centroid[0] + size * 0.3, centroid[1] - size * 0.7];
  var leftEyebrowPath;
  var rightEyebrowPath;
  switch (faceData.eyebrow) {
    case 1:
      // 向上弯曲的弧线
      leftEyebrowPath = `M${leftStart[0]},${leftStart[1]} Q${leftControl[0]},${leftControl[1]} ${leftEnd[0]},${leftEnd[1]}`;
      rightEyebrowPath = `M${rightStart[0]},${rightStart[1]} Q${rightControl[0]},${rightControl[1]} ${rightEnd[0]},${rightEnd[1]}`;
      break;
    case 2:
      // 平直的眉毛
      leftEyebrowPath = `M${leftStart[0]},${leftStart[1]} L${leftEnd[0]},${leftEnd[1]}`;
      rightEyebrowPath = `M${rightStart[0]},${rightStart[1]} L${rightEnd[0]},${rightEnd[1]}`;
      break;
    case 3:
      // 倒八字眉毛
      leftEyebrowPath = `M${leftStart[0]},${leftStart[1]} L${leftEnd2[0]},${leftEnd2[1]}`;
      rightEyebrowPath = `M${rightStart2[0]},${rightStart2[1]} L${rightEnd[0]},${rightEnd[1]}`;
      break;
  }
  var mouthPath = `M${centroid[0] - size * 0.3},${centroid[1] + size * 0.3} Q${
    centroid[0]
  },${centroid[1] + size * 0.3 - size * 0.3 * (faceData.mouth - 2)} ${
    centroid[0] + size * 0.3
  },${centroid[1] + size * 0.3}`;
  // Face
  face
    .append("ellipse")
    .attr("cx", centroid[0])
    .attr("cy", centroid[1] - size * 0.1)
    .attr("rx", size)
    .attr("ry", size)
    .attr("fill", faceColor)
    .attr("stroke", "black");

  // Hair
  switch (faceData.hair) {
    case 1:
      face
        .append("ellipse")
        .attr("cx", centroid[0])
        .attr("cy", centroid[1] - size * 1) // 调整发型的位置
        .attr("rx", size * 0.6) // 调整发型的大小
        .attr("ry", size * 0.15) // 调整发型的大小
        .attr("fill", "black");
      break;
    case 2:
      face
        .append("rect")
        .attr("x", centroid[0] - size * 0.8) // 调整矩形的位置
        .attr("y", centroid[1] - size * 1.3) // 调整矩形的位置
        .attr("width", size * 1.6) // 调整矩形的宽度
        .attr("height", size * 0.6) // 调整矩形的高度
        .attr("fill", "black");
      break;
    case 3:
      let x1 = centroid[0] - size * 1.1; // 左上点
      let y1 = centroid[1] - size * 1.5;
      let x2 = centroid[0] + size * 1.1; // 右上点
      let y2 = y1;
      let x3 = centroid[0] + size * 0.8; // 右下点
      let y3 = centroid[1] - size * 0.7;
      let x4 = centroid[0] - size * 0.8; // 左下点
      let y4 = y3;

      let pathData = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`;

      face
        .append("path")
        .attr("d", pathData) // 使用创建的路径数据
        .attr("fill", "black");
      break;
  }

  // Eyes
  face
    .append("circle")
    .attr("cx", centroid[0] - size * 0.25)
    .attr("cy", centroid[1] - size * 0.2)
    .attr("r", size * 0.1)
    .attr("fill", "black");
  face
    .append("circle")
    .attr("cx", centroid[0] + size * 0.25)
    .attr("cy", centroid[1] - size * 0.2)
    .attr("r", size * 0.1)
    .attr("fill", "black");
  //eyebrow
  face
    .append("path")
    .attr("d", leftEyebrowPath)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill", "none");
  face
    .append("path")
    .attr("d", rightEyebrowPath)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  // Mouth
  face
    .append("path")
    .attr("d", mouthPath)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill", "none");
}
function genRanFaceData() {
  function getRanInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return {
    hair: getRanInt(1, 3),
    mouth: getRanInt(1, 3),
    eyebrow: getRanInt(1, 3),
    face: getRanInt(1, 3),
  };
}
function genNorFaceData() {
  return { hair: 2, mouth: 2, eyebrow: 2, face: 2 };
}
