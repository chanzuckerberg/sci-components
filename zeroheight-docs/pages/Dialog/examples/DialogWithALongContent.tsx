// Most minimal Dialog (just has the basic requirements)

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      <Dialog onClose={handleClose} open={isOpen} sdsSize="xs">
        <DialogTitle
          title="Learning"
          subtitle="Learning Resources"
          onClose={handleClose}
        />
        <DialogContent>
          Embark on a fulfilling journey of continuous improvement with our vast
          repository of valuable learning resources. Within this dedicated
          section, you'll find an extensive collection of meticulously crafted
          tutorials, comprehensive guides, and thought-provoking articles
          meticulously designed to enrich your skill set and provide profound
          insights into your field of interest. Explore a diverse range of
          topics, from fundamental principles to advanced techniques, as we aim
          to empower you with knowledge that transcends boundaries. Whether
          you're a novice eager to build a strong foundation or a seasoned
          professional seeking to stay at the forefront of your industry, our
          treasure trove of educational materials is your gateway to honing your
          expertise. Unlock your potential, expand your horizons, and stay ahead
          of the curve by immersing yourself in this wealth of knowledge. We
          believe that continuous learning is the key to personal and
          professional growth, and we're excited to accompany you on this
          educational journey, every step of the way.
        </DialogContent>
        <DialogActions buttonPosition="left">
          <Button sdsStyle="square" sdsType="primary" onClick={handleClose}>
            Primary Action
          </Button>
          <Button sdsStyle="square" sdsType="secondary" onClick={handleClose}>
            Secondary Action
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
