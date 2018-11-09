function Exp(x, y, size) {
  this.pos = createVector(x, y); //exp drops at player's death x & y
  this.size = size; //player's amount of exp is inherited by exp,
                    // all random spawning exp has minimal exp

  //this.show() = function() {
  //  push();
  //  fill(50, 205, 50);
  //  ellipse(this.pos.x, this.pos.y, 16, 16);
  //  pop();
  //}

}
