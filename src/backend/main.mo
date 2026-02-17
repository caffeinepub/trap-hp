actor {
  public query ({ caller }) func calculateHorsepower(torque : Float, rpm : Float) : async Float {
    (torque * rpm) / 5252.0;
  };
};
