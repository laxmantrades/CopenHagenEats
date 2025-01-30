import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditMenu=()=>{

  
        return (
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Menu</DialogTitle>
                  <DialogDescription>
                    Update your menu to keep your offerings fresh and exciting!
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      placeholder="Enter menu name"
                    />
                    {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      type="text"
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      placeholder="Enter menu description"
                    />
                    {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
                  </div>
                  <div>
                    <Label>Price in (Rupees)</Label>
                    <Input
                      type="number"
                      name="price"
                      value={input.price}
                      onChange={changeEventHandler}
                      placeholder="Enter menu price"
                    />
                    {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
                  </div>
                  <div>
                    <Label>Upload Menu Image</Label>
                    <Input
                      type="file"
                      name="image"
                      onChange={(e) =>
                        setInput({ ...input, image: e.target.files?.[0] || undefined })
                      }
                    />
                    {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
                  </div>
                  <DialogFooter className="mt-5">
                    {loading ? (
                      <Button disabled className="bg-orange hover:bg-hoverOrange">
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button className="bg-orange hover:bg-hoverOrange">Submit</Button>
                    )}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
    )
}
export default EditMenu