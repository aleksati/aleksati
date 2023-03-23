const MyTable = () => {
  return (
    <div className="Rtable Rtable--5cols Rtable--collapse">
      {/* Column one */}
      <div style={{ order: 1 }} className="Rtable-cell">
        <b>Compression</b>
      </div>
      <div style={{ order: 2 }} className="Rtable-cell">
        M-JPEG (quality 60%)
      </div>

      {/* Column two */}
      <div style={{ order: 1 }} className="Rtable-cell">
        <b>Bit Depth</b>
      </div>
      <div style={{ order: 2 }} className="Rtable-cell">
        RGB24 bit
      </div>

      {/* Column three */}
      <div style={{ order: 1 }} className="Rtable-cell">
        <b>Resolution</b>
      </div>
      <div style={{ order: 2 }} className="Rtable-cell">
        1024x576
      </div>

      {/* Column four */}
      <div style={{ order: 1 }} className="Rtable-cell">
        <b>FPS</b>
      </div>
      <div style={{ order: 2 }} className="Rtable-cell">
        60
      </div>

      {/* Column five */}
      <div style={{ order: 1 }} className="Rtable-cell">
        <b>Notes</b>
      </div>
      <div style={{ order: 2 }} className="Rtable-cell">
        Acceptable video quality
      </div>
    </div>
  );
};

export default MyTable;
