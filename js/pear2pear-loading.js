Pear2PearLoading = (function() {
  var container, leftPear, rightPear;

  var intervalId;

  var rightImgOffset = 250;

  var xCells = 6;
  var yCells = 8;

  var colors = [
    "00B59D", "0A5843", "1363A7", "1ABEDC", "4F2641", "52C9E6", "68C5A6",
    "A6C76C", "AB2035", "EC2F81", "EE2539", "F3735D", "F5979C", "FAB35D"           
  ];

  var randomColor = function() {
    return "#" + colors[Math.floor(Math.random() * colors.length)];
  };

  var createTriangle = function() {
    var div = document.createElement('div');

    div.className = "loading-triangle";
    div.style.borderBottomColor = randomColor();

    var direction = Math.floor(Math.random() * 2);
    var origin = randomPosition(direction);
    var destination = randomPosition(direction ^ 1);

    div.style.left = origin[0];
    div.style.top = origin[1];
    rotate(div, origin[2]);


    document.body.appendChild(div);

    setTimeout(function() {
      div.style.zIndex = 10;
      div.style.left = destination[0];
      div.style.top = destination[1];
      rotate(div, 720 + destination[2]);
      div.addEventListener("webkitTransitionEnd", triangleTransitioned, true);
      div.addEventListener("transitionend", triangleTransitioned, true);
    }, 40);

  };

  var rotate = function(el, deg) {
    el.style.transform =
      el.style.webkitTransform =
      "rotate(" + deg + "deg)";
  };

  var triangleTransitioned = function(e) {
    e.target.style.zIndex = -1;
  };

  var randomPosition = function(direction) {
    // plus offset if position is in the right
    directionOffset = direction * rightImgOffset;

    cell = randomCellPosition();
    
    // There are two triangles by cell
    cellComplement = Math.floor(Math.random() * 2);

    // Adjacent cells are rotated 180
    cellRotated = (cell[0] + cell[1]) % 2;

    finalRotation = (45 + cellComplement * 180 + cellRotated * 90) % 360;

    switch(finalRotation) {
    case 45:
      rotationOffset = [0, 0];
      break;
    case 135:
      rotationOffset = [0, 7];
      break;
    case 225:
      rotationOffset = [-7, 7];
      break;
    case 315:
      rotationOffset = [-7, 0];
      break;
    default:
      console.log("Imposible final rotation: " + finalRotation);
    }
     
    return [
      // 10px per cell + directionOffset
      cell[0] * 14 + directionOffset + rotationOffset[0],
      // 10px per cell
      cell[1] * 14 + rotationOffset[1],
      // offset + cell complement + rotated cell
      finalRotation
    ];
  };

  var randomCellPosition = function() {
    return [
      Math.floor(Math.random() * xCells),
      Math.floor(Math.random() * yCells)
    ];
  };

  var getPosition = function(id) {
    el = document.getElementById(id);
    rect = el.getBoundingClientRect();
    
    return [ rect.left + rect.width / 2, rect.top + rect.height / 2 ];
  };

  function setSize() {
    var containerWidth = container.clientWidth;
    console.log(containerWidth);

    leftPear.style.fontSize =
      rightPear.style.fontSize =
      containerWidth * 0.25;

    leftPear.style.marginLeft =
      leftPear.style.marginRight =
      rightPear.style.marginLeft =
      rightPear.style.marginRight =
      containerWidth * 0.15;
    
  }

  function create(el) {
    container =  document.getElementById(el);
    container.className = 'pear2pear-loading-container';
      
    leftPear = document.createElement('div');
    leftPear.className = 'pear2pear-loading-pear pear2pear-loading-pear-left';
    container.appendChild(leftPear);

    rightPear = document.createElement('div');
    rightPear.className = 'pear2pear-loading-pear pear2pear-loading-pear-right';
    container.appendChild(rightPear);

    setSize();

    window.onresize = setSize;
  }

  var start = function() {
    intervalId = setInterval(function() { createTriangle(); }, 1000);
  };

  var pause = function() {
    window.clearInterval(intervalId);
  };
 
  return { 
    createTriangle: createTriangle,
    create: create,
    start: start,
    pause: pause
  };
})();
